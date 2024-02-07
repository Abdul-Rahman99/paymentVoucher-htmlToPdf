const mongoose = require("mongoose");

const db_connection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connection Successfull to your DB");
  } catch (err) {
    console.error(`Error Connecting to the DB ${err.message}`);
  }
};
module.exports = db_connection;