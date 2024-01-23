const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB URI. Replace 'your_database_url' with your actual MongoDB URL.
const MONGO_URI = 'mongodb://127.0.0.1:27017/GameDB';

// Create a function to connect to MongoDB.
const connectDB = async () => {
  // try {
    await mongoose.connect(MONGO_URI, {
    });
    console.log('MongoDB Connected');
  // } catch (error) {
  //   console.error('Error connecting to MongoDB:', error.message);
  //   console.error('Exiting the application...');
  //   process.exit(1); // Exit the application with an error code.
  // }
};

module.exports = connectDB;
