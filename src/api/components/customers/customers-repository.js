const { Customer } = require('../../../models');

async function getCustomers() {
  return await Customer.find();
}

async function getCustomer(id) {
  return await Customer.findById(id);
}

async function createCustomer(name, email, phone, address, customerType) {
  return await Customer.create({
    name,
    email,
    phone,
    address,
    customerType,
  });
}

async function updateCustomer(id, name, email, phone, address, customerType) {
  return await Customer.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name,
        email,
        phone,
        address,
        customerType,
      },
    },
    { new: true }
  );
}

async function deleteCustomer(id) {
  return await Customer.deleteOne({ _id: id });
}

module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
