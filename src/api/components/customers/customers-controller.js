const customersService = require('./customers-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const mongoose = require('mongoose');

async function getCustomers(request, response, next) {
  try {
    const customers = await customersService.getCustomers();
    return response.status(200).json(customers);
  } catch (error) {
    return next(error);
  }
}

async function getCustomer(request, response, next) {
  try {
    if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Customer not found'
      );
    }
    const customer = await customersService.getCustomer(request.params.id);

    if (!customer) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Customer not found'
      );
    }

    return response.status(200).json(customer);
  } catch (error) {
    return next(error);
  }
}

async function createCustomer(request, response, next) {
  const { name, email, phone, address, customer_type } = request.body;

  try {
    const success = await customersService.createCustomer(
      name,
      email,
      phone,
      address,
      customer_type
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create customer'
      );
    }

    return response
      .status(201)
      .json({ name, email, phone, address, customer_type });
  } catch (error) {
    return next(error);
  }
}

async function updateCustomer(request, response, next) {
  const id = request.params.id;

  const { name, email, phone, address, customer_type } = request.body;

  try {
    const success = await customersService.updateCustomer(
      id,
      name,
      email,
      phone,
      address,
      customer_type
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update customer'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

async function deleteCustomer(request, response, next) {
  try {
    const id = request.params.id;

    const success = await customersService.deleteCustomer(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete customer'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
