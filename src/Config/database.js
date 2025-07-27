const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://asaryansingh2004:io3ywYZw1ho2g2MA@leagcy-metro-project.tvztzdh.mongodb.net/delhiMetro"
  );
};


module.exports = connectDB;