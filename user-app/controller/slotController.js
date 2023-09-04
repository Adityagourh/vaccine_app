const slotSchema = require("../../model/slotSchema");
const userSchema = require("../../model/userSchema");
const moment = require("moment");

let getAvailableSlots = async (req, res) => {
  try {
    const userId = req.params.id;
    const { date, dose } = req.body;
    const user = await userSchema.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const firstDoseCompleted = user.firstDoseCompleted;
    const slots = await slotSchema.find();
    if (firstDoseCompleted && dose === "second") {
      return res.json({
        success: true,
        message: "No available second-dose slots",
        slots: [],
      });
    }
    if (!firstDoseCompleted && dose === "first") {
      return res.json({
        success: true,
        message: "You can book first-dose slots",
        slots,
      });
    }
    res.json(slots);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Register a slot for a user
let registerSlot = async (req, res) => {
  try {
    const { userId, slotId, dose } = req.body;
    const user = await userSchema.findById(userId);
    const slot = await slotSchema.findById(slotId);

    if (!user || !slot || slot.availableDoses <= 0) {
      return res.status(400).json({
        success: false,
        message: "User, slot, or dose not found or not available",
      });
    }

    if (user.secondDose.completed) {
      return res.status(400).json({
        success: false,
        message: "User has already taken both doses",
      });
    }

    const timestamp = moment().format("YYYY-MM-DD hh:mm:ss A");

    if (!user.firstDose.completed) {
      user.firstDose.timestamp = timestamp;
      user.firstDose.completed = true;
      slot.firstDoseRegistrations.push(userId);
      await slot.save();
      await user.save();
      return res.status(201).json({
        success: true,
        message: "Your first dose registered successfully",
      });
    } else if (!user.secondDose.completed) {
      user.secondDose.timestamp = timestamp;
      user.secondDose.completed = true;
      slot.secondDoseRegistrations.push(userId);
      await slot.save();
      await user.save();
      return res.status(201).json({
        success: true,
        message: "Your second dose registered successfully",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update a user's registered slot
let updateSlot = async (req, res) => {
  try {
    const { userId, slotId } = req.body;
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const slot = await slotSchema.findById(slotId);
    if (!slot || !slot.availableDoses) {
      return res.status(404).json({
        success: false,
        message: "Slot not found or not available",
      });
    }
    if (user.firstDose.completed) {
      if (user.secondDose.completed) {
        user.secondDose.timestamp = moment().format("YYYY-MM-DD hh:mm:ss A");
      } else {
        user.firstDose.timestamp = moment().format("YYYY-MM-DD hh:mm:ss A");
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "You are not register any slot firstly book slot",
      });
    }
    if (moment().add(24, "hours").isAfter(slotTime)) {
      return res.status(400).json({
        success: true,
        message: "The slot update deadline has passed",
      });
    }
    res.json({ message: "Slot update successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAvailableSlots,
  registerSlot,
  updateSlot,
};
