const joi = require('joi');

module.exports = {
  createCustomer: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
      address: joi.string().min(1).required().label('Address'),
      phone: joi
        .string()
        .pattern(/^(\+62|62|0)[1-9][0-9]{7,10}$/)
        .required()
        .label('Phone'),
      customer_type: joi
        .string()
        .valid('VVIP', 'VIP', 'REGULAR')
        .required()
        .label('Customer Type'),
    },
  },

  updateCustomer: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
      address: joi.string().min(1).max(255).required().label('Address'),
      phone: joi
        .string()
        .pattern(/^(\+62|62|0)[1-9][0-9]{7,10}$/)
        .required()
        .label('Phone'),
      customer_type: joi
        .string()
        .valid('VVIP', 'VIP', 'REGULAR')
        .label('Customer Type'),
    },
  },
};
