const { User } = require('../../../models');

/**
 * Get user by email for login information
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

async function failedLoginAttempt(email) {
  let user = await User.findOneAndUpdate(
    { email },
    { $inc: { attempt: 1 } },
    { new: true }
  );

  if (user.attempt >= 5) {
    await User.findOneAndUpdate(
      { email },
      { $set: { lockedUntil: new Date(Date.now() + 60 * 1000 * 30) } },
      { new: true }
    );
  }
}

async function resetUserLoginAttempt(email) {
  return User.findOneAndUpdate(
    { email },
    { $set: { attempt: 0, lockedUntil: null } }
  );
}

module.exports = {
  getUserByEmail,
  failedLoginAttempt,
  resetUserLoginAttempt,
};
