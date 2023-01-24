const { User } = require('./models/Users.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const passfather = require('passfather'); // for changing password by sending a link to user's email

const createProfile = async (req, res, next) => {
  const { email, password } = req.body;
  const registeredUser = await User.findOne({ email: email });
  const currentDate = new Date().toString();

  const user = new User({
    email: email,
    password: await bcrypt.hash(password, 10),
    created_date: currentDate
  });

  if (!email) {
    return res.status(400).json({ 'message': 'Wrong email' });
  } 
  if (!password) {
    return res.status(400).json({ 'message': 'Wrong password' });
  } 
  if (registeredUser) {
    return res.status(400).json({ 'message': 'This user is already registered' });
  } else {
    await user.save()
      .then(saved => res.status(200).json({ 'message': 'Profile created successfully' }))
      .catch(err => next(err));
  }
}

const login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && await bcrypt.compare(String(req.body.password), String(user.password))) {
    const payload = { _id: user._id };
    const jwt_token = jwt.sign(payload, 'secret-jwt-key');
    return res.status(200).json({ jwt_token: jwt_token, 'message': 'User is authorized' });
  } else {
    return res.status(400).json({ 'message': 'Not authorized' });
  }
}

const forgotPassword = async (req, res, next) => {
  const thisUser = await User.findOne({ email: req.body.email });
  if (!thisUser) {
    return res.status(400).json({ 'message': 'User is not authorized' });
  }
  //const newPassword = passfather();
  const newPassword = req.body.password;
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email: req.body.email }, { $set: { password: hashedNewPassword } })
    .then(result => {
      const payload = { _id: result._id };
      const jwt_token = jwt.sign(payload, 'secret-jwt-key');
      return res.status(200).json({ jwt_token: jwt_token, 'message': 'Password changed successfully' });
    })
}

//this function isn't used now, but could be used with updating the app in future
const deleteProfile = async (req, res, next) => {
  await User.findOneAndDelete({ _id: req.user._id })
    .then(profile => {
      return res.status(200).json({ 'message': 'Profile deleted successfully' });
    })
    .catch(err => {
      return res.status(400).json({ 'message': 'Profile not deleted' });
    })
}

module.exports = {
  createProfile,
  login,
  forgotPassword,
  deleteProfile
};
