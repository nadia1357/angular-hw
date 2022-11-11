const { User } = require('./models/Users.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passfather = require('passfather');

const authJWT = (auth) => {
  if (!auth) {
    return res.status(400).json({ 'message': 'Please, provide authorization header' });
  }
  const [, token] = auth.split(' ');
  if (!token) {
    return res.status(400).json({ 'message': 'Please, include token to request' });
  }

  try {
    const tokenPayload = jwt.verify(token, 'secret-jwt-key');
    return tokenPayload;
  } catch (err) {
    return res.status(400).json({ 'message': 'Wrong JWT' });
  }
}

const createProfile = async (req, res, next) => {
  const { email, password, role } = req.body;
  const registeredUser = await User.findOne({ email: email });
  const currentDate = new Date().toString();

  const user = new User({
    email: email,
    password: await bcrypt.hash(password, 10),
    role: role,
    created_date: currentDate
  });

  if (!email) {
    return res.status(400).json({ 'message': 'Wrong email' });
  } else if (!password) {
    return res.status(400).json({ 'message': 'Wrong password' });
  } else if (registeredUser) {
    return res.status(400).json({ 'message': 'This user is already registered' });
  } else {
    await user.save()
      .then(saved => res.status(200).json({ 'message': `Profile created successfully` }))
      .catch(err => next(err));
  };
}

const login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && await bcrypt.compare(String(req.body.password), String(user.password))) {
    const payload = { email: user.email, password: user.password, userId: user._id, role: user.role };
    const jwtToken = jwt.sign(payload, 'secret-jwt-key');
    return res.status(200).json({ jwt_token: jwtToken, 'message': 'User is authorized' });
  } else {
    return res.status(400).json({ 'message': 'Not authorized' });
  }
}

const forgotPassword = async (req, res, next) => {
  const thisUser = await User.findOne({ email: req.body.email });
  const { authorization } = req.headers;
  const user = authJWT(authorization);
  const newPassword = passfather();

  if (user.email === thisUser.email) {
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email: req.body.email }, { $set: { password: hashedNewPassword} })
    .then(result => {
      const payload = { email: user.email, password: hashedNewPassword, userId: user._id, role: user.role };
      const jwtToken = jwt.sign(payload, 'secret-jwt-key');
    })
    .then(result => res.status(200).json({ 'message': 'New password sent to your email address' }));
  } else {
    return res.status(400).json({ 'message': 'Not authorized' });
  }
}

const getProfileInfo = async (req, res, next) => {
  const { authorization } = req.headers;
  const user = authJWT(authorization);

  if (user) {
    return res.status(200).json({ 'user': user });
  } else {
    return res.status(400).json({ 'message': 'User is not found' });
  }
}

const deleteProfile = async (req, res, next) => {
  const { authorization } = req.headers;
  const user = authJWT(authorization);

  await User.findOneAndDelete({ email: user.email })
    .then(profile => {
      return res.status(200).json({ 'message': 'Profile deleted successfully' });
    })
    .catch(err => {
      return res.status(400).json({ 'message': 'Profile not deleted' });
    })
}

const changeProfilePassword = async (req, res, next) => {
  const { authorization } = req.headers;
  const user = authJWT(authorization);
  const { oldPassword, newPassword } = req.body;

  const thisUser = await User.findOne({ email: user.email });
  if (thisUser && await bcrypt.compare(String(oldPassword), String(user.password))) {
      thisUser.password = await bcrypt.hash(newPassword, 10);
      User.findOneAndUpdate({ email: user.email }, {$set: { password: thisUser.password}})
      .then (user => res.status(200).json({ 'message': `Password changed successfully` }))
    } else {
      return res.status(400).json({ 'message': 'Password is not changed' })
    }  
}

module.exports = {
  createProfile,
  login,
  forgotPassword,
  getProfileInfo,
  deleteProfile,
  changeProfilePassword
};
