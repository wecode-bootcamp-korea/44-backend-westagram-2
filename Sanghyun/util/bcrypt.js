const bcrypt = require('bcrypt');
const saltRounds = 12;

module.exports = {
  hash: async (password) => await bcrypt.hash(password, saltRounds),
  compare: async (password, hashedPassword) => await bcrypt.compare(password, hashedPassword)
};
