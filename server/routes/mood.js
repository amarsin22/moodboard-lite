const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const MoodBoard = require("../models/MoodBoard");
const today = require("../utils/date");

// Create moodboard
router.post("/", auth, async (req, res) => {
  try {
    const { emojis, imageUrl, color, note } = req.body;

    if (!emojis || emojis.length === 0)
      return res.status(400).json({ message: "Please select at least one emoji" });

    const date = today();
    const exists = await MoodBoard.findOne({ user: req.user._id, date });
    if (exists) return res.status(400).json({ message: "You already submitted today's mood" });

    const mood = await MoodBoard.create({
      user: req.user._id,
      emojis,
      imageUrl,
      color,
      note,
      date
    });

    res.json(mood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Today's mood
router.get("/today", auth, async (req, res) => {
  const mood = await MoodBoard.findOne({ user: req.user._id, date: today() });
  res.json(mood);
});

// Timeline
router.get("/", auth, async (req, res) => {
  const list = await MoodBoard.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(list);
});

module.exports = router;
