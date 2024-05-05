const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');

/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function login(request, response, next) {
  try {
    const loginResult = await authenticationServices.login(request.body);
    response.json(loginResult);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
};
