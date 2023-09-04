const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  availableDoses: {
    type: Number,
    required: true,
  },
  firstDoseRegistrations: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      registrationTime: {
        type: Date,
      },
    },
  ],
  secondDoseRegistrations: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      registrationTime: {
        type: Date,
      },
    },
  ],
});

module.exports = mongoose.model("Slot", slotSchema);
