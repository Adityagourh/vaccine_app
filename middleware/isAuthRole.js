let userSchema = require("../model/userSchema");
//employee role authorization middleware
let userRole = async (req, res, next) => {
  let phone = await req.body.phoneNo;
  let user = await userSchema.findOne({
    phoneNo: phone,
  });
  if (user) {
    if (user.role === "user") {
      next();
    } else {
      empLogger.log("error", `Invalid role specified`);
      res.status(400).json({
        success: false,
        message: "Invalid role specified",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid mail id ",
    });
  }
};

//Admin role authontication
let adminRole = async (req, res, next) => {
  let phone = await req.body.phoneNo;
  let user = await userSchema.findOne({
    phoneNo: phone,
  });
  if (user) {
    if (user.role === "admin") {
      next();
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid role specified",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid mail id ",
    });
  }
};

module.exports = { userRole, adminRole };
