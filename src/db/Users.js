const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: { type: String, default: null },
  password: { type: String, default: null },
  email: { type: String, default: null },
  createdAt: { type: String, default: null },
});

module.exports = mongoose.model('Users', schema, 'users');