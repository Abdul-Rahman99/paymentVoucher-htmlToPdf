const mongoose = require("mongoose");

// @desc    a counter to increase the serialNumber automaically and not lose it ever
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number },
});

const Counter = mongoose.model("Counter", counterSchema);

module.exports = Counter;
