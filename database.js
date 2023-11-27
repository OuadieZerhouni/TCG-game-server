const mongoose = require('mongoose');

// Define the MongoDB URI. Replace 'your_database_url' with your actual MongoDB URL.
const mongoURI = 'mongodb://localhost/your_database_name';

// Create a function to connect to MongoDB.
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the application with an error code.
  }
};

module.exports = connectDB;
