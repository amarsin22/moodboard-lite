const mongoose = require('mongoose');

const MoodBoardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  emojis: { type: [String], required: true },
  imageUrl: { type: String },
  color: { type: String },
  note: { type: String, maxlength: 200 },
  date: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('MoodBoard', MoodBoardSchema);
