require("dotenv").config();

const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../src/models/user");
const bcrypt = require("bcrypt");
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  const uri = mongoServer.getUri();

  await mongoose.connect(uri);

  console.log("Test MongoDB connected:", mongoose.connection.readyState);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Backend API", () => {
  test("API should respond", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
  });
});
test("Register should reject when name is missing", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({
      email: "test@example.com",
      password: "123456"
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("Full name is required");
});
test("Register should reject invalid email", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Test User",
      email: "invalid-email",
      password: "123456"
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("Please provide a valid email address");
});
test("Register should reject short password", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Test User",
      email: "test@example.com",
      password: "123"
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe(
    "Password must be at least 6 characters"
  );
});
test("Login should reject non-existing user", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "doesnotexist@example.com",
      password: "123456"
    });

  expect(response.statusCode).toBe(404);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("User not found");
}, 15000);
test("Login should reject wrong password", async () => {
  const hashedPassword = await bcrypt.hash("correctpassword123", 10);

  await User.create({
    name: "Test User",
    email: "wrongpass@example.com",
    password: hashedPassword,
  });

  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "wrongpass@example.com",
      password: "wrongpassword123",
    });

  expect(response.statusCode).toBe(401);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("Invalid Credentials");
});