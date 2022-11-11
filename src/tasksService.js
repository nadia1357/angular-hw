const { Load } = require('./models/Loads.js');
const jwt = require('jsonwebtoken');
const { findTruckForShipper, updateTruckForNextShipping, truckTypes } = require('./trucksService.js');

const authJWT = (auth) => {
  if (!auth) {
    return res.status(401).json({ 'message': 'Please, provide authorization header' });
  }
  const [, token] = auth.split(' ');
  if (!token) {
    return res.status(401).json({ 'message': 'Please, include token to request' });
  }

  try {
    const tokenPayload = jwt.verify(token, 'secret-jwt-key');
    return tokenPayload;
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
}

const getUserLoads = async (req, res, next) => {
  const { authorization } = req.headers;
  const user = authJWT(authorization);

  if (user.role === 'Driver') {
    let userLoads = [];
    let userAssignedLoads = [];
    await Load.find({ assigned_to: user.userId })
      .then((result) => { userAssignedLoads = result })
      .catch(err => next(err));
    await Load.find({ completed_to: user.userId })
      .then((result) => {
        userLoads = [...userAssignedLoads, ...result];
        return res.status(200).json({ 'loads': userLoads });
      })
      .catch(err => next(err));
  } else {
    await Load.find({ created_by: user.userId })
      .then((result) => {
        return res.status(200).json({ 'loads': result });
      })
      .catch(err => next(err));
  }
}

const addUserLoad = async (req, res, next) => {
  const newLoadInfo = req.body.payload;
  const { authorization } = req.headers;
  const user = authJWT(authorization);
  const currentDate = new Date().toString();
  const logText = `Load is created by user ### ${user.userId}`;

  if (user.role === "SHIPPER") {
    const load = new Load({
      created_by: user.userId,
      assigned_to: null,
      completed_to: null,
      status: 'NEW',
      state: 'En route to Pick Up',
      name: newLoadInfo.name,
      payload: newLoadInfo.payload,
      pickup_address: newLoadInfo.pickup_address,
      delivery_address: newLoadInfo.delivery_address,
      dimensions: newLoadInfo.dimensions,
      logs: [{ 'message': logText, 'time': currentDate }],
      created_date: currentDate
    });
    await load.save()
      .then((saved) => res.status(200).json({ 'message': 'Load created successfully' }))
      .catch(err => next(err));
  } else return res.status(400).json({ 'message': 'User must be SHIPPER' });
}

const getUserActiveLoad = async (req, res, next) => {
  const { authorization } = req.headers;
  const user = authJWT(authorization);
  if (user.role === 'DRIVER') {
    await Load.findOne({ assigned_to: user.userId })
      .then(load => res.status(200).json({ 'load': load }))
      .catch(err => res.status(400).json({ 'message': 'Active load not found' }));
  } else return res.status(400).json({ 'message': 'User must be DRIVER' });
}

const iterateLoadState = async (req, res, next) => {
  const { authorization } = req.headers;
  const user = authJWT(authorization);
  if (user.role === 'DRIVER') {
    await Load.findOneAndUpdate({ assigned_to: user.userId })
      .then((load) => {
        if (load.state === 'En route to Pick Up') {
          load.state = 'Arrived to Pick Up';
          let currentDate = new Date().toString();
          load.logs.push({
            'message': 'Load state is changed to Arrived to Pick Up',
            'time': currentDate
          });
        } else if (load.state === 'Arrived to Pick Up') {
          load.state = 'En route to delivery';
          let currentDate = new Date().toString();
          load.logs.push({
            'message': 'Load state is changed to En route to delivery',
            'time': currentDate
          });
        } else if (load.state === 'En route to delivery') {
          load.state = 'Arrived to delivery';
          load.status = 'SHIPPED';
          let currentDate = new Date().toString();
          load.logs.push({
            'message': 'Load status is changed to SHIPPED, Load state is changed to Arrived to delivery',
            'time': currentDate
          });
          load.completed = load.assigned_to;
          updateTruckForNextShipping(load.assigned_to);
        }
        load.save()
          .then((saved) => res.status(200).json({ 'message': `Load state changed to ${load.state}` }))
          .catch(err => next(err));
      })
  } else {
    return res.status(400).json({ 'message': 'User must be DRIVER' });
  }
}

const getUserLoadById = async (req, res, next) => {
  await Load.findById(req.params.id)
    .then(load => res.status(200).json({ 'load': load }))
    .catch(err => next(err));
}

const updateUserLoadById = async (req, res, next) => {
  const { authorization } = req.headers;
  const user = authJWT(authorization);
  const load = req.body.payload;

  if (user.role === 'SHIPPER') {
    await Load.findByIdAndUpdate({ _id: req.params.id }, {
      $set: {
        name: load.name, payload: load.payload, pickup_address: load.pickup_address,
        delivery_address: load.delivery_address, dimensions: load.dimensions
      }
    })
      .then((load) => {
        const currentDate = new Date().toString();
        let logText = `Load is updated by user ### ${user.userId}`;
        load.logs.push({ 'message': logText, 'time': currentDate });
        load.save()
          .then(saved => res.status(200).json({ 'message': 'Load details changed successfully' }))
          .catch(err => next(err));
      })
  } else return res.status(400).json({ 'message': 'User must be SHIPPER' });
}

const deleteUserLoadById = async (req, res, next) => {
  await Load.findByIdAndDelete(req.params.id)
    .then(load => res.status(200).json({ 'message': 'Load deleted successfully' }))
    .catch(err => next(err));
}

const postUserLoadById = async (req, res, next) => {
  const { authorization } = req.headers;
  const user = authJWT(authorization);
  let driver_found;

  await Load.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: 'POSTED' } })
    .then((load) => {
      let currentDate = new Date().toString();
      load.logs.push({ 'message': 'Load status is changed to POSTED', 'time': currentDate });

      if (user.role === 'SHIPPER') {
        const thisDriver = findTruckForShipper(load.dimensions, load.payload);
        if (thisDriver !== 'Driver not found') {
          driver_found = true;
          load.status = 'ASSIGNED';
          load.state = 'Arrived to Pick Up';
          load.assigned_to = thisDriver;
          let currentDate = new Date().toString();
          let logText = `Load is assigned to driver with id ### ${load.assigned_to}, Load state is changed to Arrived to Pick Up`
          load.logs.push({ 'message': logText, 'time': currentDate });
          return res.status(200).json({
            'message': 'Load posted successfully',
            'driver_found': driver_found
          })
        } else {
          load.status = 'NEW';
          let currentDate = new Date().toString();
          load.logs.push({ 'message': 'Load status is changed to NEW', 'time': currentDate });
        }
      } else return res.status(400).json({ 'message': 'User must be SHIPPER' });
    })
}

const getUserLoadShippingInfoById = async (req, res, next) => {
  const { authorization } = req.headers;
  const user = authJWT(authorization);
  const load = await Load.findById({ _id: req.params.id });

  if (user.role === 'SHIPPER') {
    if (load.state !== 'SHIPPED') {
      return res.status(200).json({ 'load': load });
    } else return res.status(400).json({ 'message': 'Load is not active' });
  } else return res.status(400).json({ 'message': 'User must be SHIPPER' });
}

module.exports = {
  getUserLoads,
  addUserLoad,
  getUserActiveLoad,
  iterateLoadState,
  getUserLoadById,
  updateUserLoadById,
  deleteUserLoadById,
  postUserLoadById,
  getUserLoadShippingInfoById
};
