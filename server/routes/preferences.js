const express = require("express");
const router = express.Router();
const UserPreference = require("../models/UserPreference");

// GET preferences
router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const prefs = await UserPreference.findOne({ username });
  if (!prefs) return res.status(404).json({ message: "User not found" });
  res.json(prefs);
});

// POST/PUT preferences
router.post("/", async (req, res) => {
  const { username, preferredTuning, sensitivity, darkMode } = req.body;

  const updated = await UserPreference.findOneAndUpdate(
    { username },
    { preferredTuning, sensitivity, darkMode },
    { new: true, upsert: true }
  );

  res.json(updated);
});

module.exports = router;
