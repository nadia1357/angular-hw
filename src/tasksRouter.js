const express = require('express');
const router = express.Router();
const {
  getUserLoads, addUserLoad, getUserActiveLoad, 
  iterateLoadState, getUserLoadById, updateUserLoadById,
  deleteUserLoadById, postUserLoadById, getUserLoadShippingInfoById
} = require('./loadsService.js');

router.get('/loads', getUserLoads);
router.post('/loads', addUserLoad);
router.get('/loads/active', getUserActiveLoad);
router.patch('/loads/active/state', iterateLoadState);
router.get('/loads/:id', getUserLoadById);
router.put('/loads/:id', updateUserLoadById);
router.delete('/loads/:id', deleteUserLoadById);
router.post('/loads/:id/post', postUserLoadById);
router.get('/loads/:id/shipping_info', getUserLoadShippingInfoById);

module.exports = {
  loadsRouter: router
};
