const express = require('express');
const app = express(); 
app.use(express.json());


const todoRoutes = require("./src/routes/todoRoutes");
const cors = require("cors");
const authRoutes = require("./src/routes/authroutes");
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({
    origin: allowedOrigin,
}));
app.use("/api/auth", authRoutes);
app.use("/api", todoRoutes);
app.get("/", (req,res)=>{
    res.send("Backend Running");
})
module.exports = app;