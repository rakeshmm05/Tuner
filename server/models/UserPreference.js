const mongoose = require("mongoose");

const UserPreferenceSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  preferredTuning: {
    G: Number,
    C: Number,
    E: Number,
    A: Number,
  },
  sensitivity: { type: Number, default: 5 },
  darkMode: { type: Boolean, default: false },
});

module.exports = mongoose.model("UserPreference", UserPreferenceSchema);
