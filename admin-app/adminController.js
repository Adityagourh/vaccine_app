const slotSchema = require("../model/slotSchema");
const userSchema = require("../model/userSchema");
const user = require("../services/userAuth");
const logger = require('../utils/adminLogger')

//Admin login
let adminLogin = async (req, res) => {
  try {
    let { phoneNo, password } = await req.body;
    const userData = await user.isExists(phoneNo, password);
    console.log(userData);
    if (userData) {
      logger.log('info', 'login successfully')
      res.status(200).json({
        success: true,
        message: "login successfully",
      });
    } else {
      logger.log('error', 'Please enter valid phone or password')
      res.status(400).json({
        success: false,
        message: "Please enter valid phone or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

let slotes = async (req, res) => {
  try {
    let createSlot = await slotSchema(req.body);
    let create = await createSlot.save();

    if (create != null) {
      res.status(201).json({
        success: true,
        message: "Slotes created successfully",
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Unable to create schedule",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};

//Users details
let totalUserRegisterd = async (req, res) => {
  try {
    const userList = await userSchema
      .find()
      .select("name age  pincode firstDose secondDose ");
    const totalUser = await userSchema.find().count();
    res.status(200).json({
      success: true,
      message: "Users list",
      count: totalUser,
      userDetails: userList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  slotes,
  adminLogin,
  totalUserRegisterd,
};
