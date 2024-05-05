const express = require('express');

const authentication = require('./components/authentication/authentication-route');
const users = require('./components/users/users-route');
const costumers = require('./components/customers/customers-route');

module.exports = () => {
  const app = express.Router();

  authentication(app);
  users(app);
  costumers(app);

  return app;
};
