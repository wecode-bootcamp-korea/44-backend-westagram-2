const appDataSource = require('./appDataSource');

const createUser = async (name, email, password, profileImage) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(
                  name,
                  email,
                  password,
                  profile_image
              ) VALUES (?, ?, ?, ?)`,
      [name, email, password, profileImage]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

const verifyUserByEmail = async (email) => {
  try {
    const [dataObj] = await appDataSource.query(
      `SELECT
        password,
        id,
        email
      FROM users
      WHERE email = ?`,
      [email]
    );
    return dataObj;
  } catch (err) {
    const error = new Error('INVALID_USER');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createUser,
  verifyUserByEmail,
};
