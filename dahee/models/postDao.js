const dataSource = require('./appDataSource');

const postUpload = async (title, content, userId) => {
  try {
    return await dataSource.appDataSource.query(
      `INSERT INTO posts(
                    title,
                    content,
                    user_id
                ) VALUES (?, ?, ?)`,
      [title, content, userId]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  postUpload,
};
