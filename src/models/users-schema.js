const usersSchema = {
  name: String,
  email: String,
  password: String,
  attempt: {
    type: Number,
    default: 0,
  },
  lockedUntil: {
    type: Date,
    default: null,
  },
};

module.exports = usersSchema;
