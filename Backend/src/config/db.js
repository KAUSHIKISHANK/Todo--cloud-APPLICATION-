const mongoose = require('mongoose');
require("dotenv").config();
const request = require("supertest");
const{mongomemoryserver} = require('mongodb-memory-server');
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
});
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
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