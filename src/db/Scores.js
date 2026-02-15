import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  redScore: { type: String, default: null },
  blueScore: { type: String, default: null },
  date: { type: Date, default: null }
});

export default mongoose.model('Scores', schema, 'scores');
