import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  username: { type: String, default: null },
  password: { type: String, default: null },
  email: { type: String, default: null },
  createdAt: { type: String, default: null },
});

export default mongoose.model('Users', schema, 'users');
