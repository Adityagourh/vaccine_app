const bcrypt = require("bcrypt");
const userSchema = require("../../model/userSchema");
const logger = require("../../utils/userLogger");
const user = require("../../services/userAuth");

module.exports = {
  registerUser: async (req, res) => {
    try {
      let userData = await user.isExists(req.body.phoneNo);
      if (userData) {
        logger.log("info", "User already exists");
        res.status(400).json({
          success: false,
          message: "User already exists",
        });
      } else {
        const userData = await userSchema(req.body);
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(req.body.password, salt);
        let user = await userData.save();
        logger.log("info", "User created successfully");
        res.status(200).json({
          success: true,
          message: "User created successfully",
          user: user,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  //User login
  loginUser: async (req, res) => {
    try {
      let { phoneNumber, password } = await req.body;
      const userData = await user.isExists(phoneNumber, password);
      if (userData) {
        logger.log("info", "Login successful");
        res.status(200).json({
          success: true,
          message: "User login successfully",
        });
      } else {
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
  },
};
