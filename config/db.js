const mongoose = require("mongoose");
require("dotenv").config();

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log(`Connect DB ${process.env.DB_MONGO}`);
  } catch (error) {
    console.log("error :>> ", error);
    process.exit(1);
  }
};

module.exports = conectarDB;
