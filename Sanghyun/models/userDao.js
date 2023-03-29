const appDataSource = require("./myDataSources");

const createUser = async ({ userName, email, profileImage, hashedPassword }) => {
  await appDataSource.query(
    `INSERT INTO users(
        user_name ,
        email,
        profile_image,
        user_password     
      ) VALUES (?, ?, ?, ?);
       `,
    [userName, email, profileImage, hashedPassword]
  );
};

const getUserById = async (userId) => {
  const user = await appDataSource.query("SELECT * FROM users WHERE id = ?", [
    userId,
  ]);
  return user[0];
};

const findMatched = async ({ userId, password }) => {
  return await appDataSource.query(
    `SELECT * FROM users WHERE id = ? AND user_password = ?`,
    [userId, password]
  );
};

const emailMatched = async(email) =>{
  const result = await appDataSource.query(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );

  if (result.length === 0) {
    throw new Error("user not found");
  }

  const user = {
    id: result[0].id,
    email: result[0].email,
    userPassword: result[0].user_password
  }

  return user;
}


const emailPasswordMatched = async({email, password}) =>{
  return await appDataSource.query(
    `SELECT * FROM users WHERE email = ? AND user_password = ?`,
    [email, password]
  )
}

const passwordEmailMatched = async(email) => {
  const result = await appDataSource.query(
    `SELECT user_password FROM users WHERE email = ?`,
    [email]
  );
  if (result.length === 0) {
    throw new Error("user not found");
  }
  return result[0].user_password;
}


module.exports = {
  createUser,
  getUserById,
  findMatched,
  emailMatched,
  emailPasswordMatched,
  passwordEmailMatched
};
