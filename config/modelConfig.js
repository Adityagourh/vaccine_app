const mongoose = require("mongoose");
const logger = require("../utils/userLogger");

mongoose.connect(process.env.URl, { useNewUrlParser: "true" });
mongoose.connection.on("connected", (error, res) => {
  logger.info("Mongoose is connected");
});
mongoose.connection.on("error", (error) => {
  logger.log("error", `${error.message}`);
});
