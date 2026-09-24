const mongoose = require('mongoose');
async function connectDB() {
    try {
       await mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.MONGO_DB_NAME || "Usernotes",
       });
        console.log("Database Connected Successfully");
        return true;
    }
    catch (error) {
        console.log("Error in DB Connection", error);
        return false;
    }
}

module.exports = connectDB;