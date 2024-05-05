const customersSchema = {
  name: String,
  email: String,
  address: String,
  phone: String,
  customerType: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
};

module.exports = customersSchema;