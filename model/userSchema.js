const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    default: "",
  },
  phoneNo: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  age: {
    type: String,
    require: true,
  },
  pincode: {
    type: Number,
    require: true,
  },
  aadharNo: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "user",
  },
  firstDose: {
    timestamp: {
      type: Date,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  secondDose: {
    timestamp: {
      type: Date,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
userSchema.set("timestamps", true);

module.exports = mongoose.model("Users", userSchema);
