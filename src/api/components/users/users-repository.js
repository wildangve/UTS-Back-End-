const { User } = require('../../../models');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers(page = 1, size = 10, search = '', sort = '') {
  const query = buildQuery(search);
  const sortOptions = buildSortOptions(sort);

  const totalUsers = await User.countDocuments(query);
  const skip = (page - 1) * size;
  const users = await User.find(query).skip(skip).limit(size).sort(sortOptions);

  return {
    page_number: page,
    page_size: size,
    count: users.length,
    total_pages: Math.ceil(totalUsers / size),
    has_previous_page: page > 1,
    has_next_page: page < Math.ceil(totalUsers / size),
    data: users.map(({ id, name, email }) => ({ id, name, email })),
  };
}

function buildQuery(search) {
  if (!search) return {};
  const [field, value] = search.split(':');
  return { [field]: { $regex: value, $options: 'i' } };
}

function buildSortOptions(sort) {
  if (!sort) return {};
  const [field, order] = sort.split(':');
  return { [field]: order === 'desc' ? -1 : 1 };
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
};
