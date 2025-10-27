const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); // Load .env locally, NOT in production
}

const mongoUri = process.env.MONGODB_URI; // Only use env variable in production
if (!mongoUri) {
    console.error("MONGODB_URI environment variable is not set!");
    process.exit(1); // Exit if MONGODB_URI is not defined
}

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;