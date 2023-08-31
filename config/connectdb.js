const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected to the database");
    } catch (error) {
        console.log(`Error connecting database ${error}`);
    }
}

module.exports = connectDB;