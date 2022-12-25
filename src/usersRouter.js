const express = require('express');
const router = express.Router();
const { createProfile, login,
  forgotPassword, deleteProfile } = require('./usersService.js');

router.post('/auth/register', createProfile);
router.post('/auth/login', login);
router.put('/auth/forgot_password', forgotPassword);
router.delete('/users/me', deleteProfile);

module.exports = {
  usersRouter: router
};
