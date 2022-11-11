const mongoose = require('mongoose');

const loadSchema =  new mongoose.Schema({
  created_by: {
    type: String
  },
  assigned_to: {
    type: String
  },
  completed_to: {
    type: String
  },
  status: {
    type: String,
    enum: ['NEW', 'POSTED', 'ASSIGNED', 'SHIPPED']
  },
  state: {
    type: String,
    enum: ['En route to Pick Up', 'Arrived to Pick Up', 'En route to delivery', 'Arrived to delivery']
  },
  name: {
    type: String
  },
  payload: {
    type: Number
  },
  pickup_address: {
    type: String
  },
  dimensions: {
    width: {
      type: Number
    },
    length: {
      type: Number
    }, 
    height: {
      type: Number
    }
  },
  logs: [{
    message: {
      type: String
    }, 
    time: {
      type: String
    }
  }],
  created_date: {
    type: String
  }
});

const Load = mongoose.model('load', loadSchema);

module.exports = {
  Load
};
