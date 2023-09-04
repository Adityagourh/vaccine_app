const bcrypt = require("bcrypt");
const userSchema = require("../model/userSchema");

let isExists = async (phone, password = 0) => {
  let user = await userSchema.findOne({
    phoneNo: phone,
  });
  if (user) {
    if (password === 0) {
      return true;
    } else {
      let hashPassword = await bcrypt.compare(password, user.password);
      if (hashPassword) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
};

module.exports = {
  isExists,
};
