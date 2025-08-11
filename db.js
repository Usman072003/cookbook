const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
  console.log('✅ MongoDB Connected');
}
module.exports = connectDB;
