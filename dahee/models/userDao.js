const appDataSource = require('./appDataSource');
const bcrypt = require('bcrypt');
const saltRounds = 12;

const createUser = async (name, email, password, profileImage) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return await appDataSource.query(
      `INSERT INTO users(
                  name,
                  email,
                  password,
                  profile_image
              ) VALUES (?, ?, ?, ?)`,
      [name, email, hashedPassword, profileImage]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createUser,
};
