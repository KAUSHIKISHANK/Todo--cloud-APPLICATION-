const express = require('express');
const app = express(); 
app.use(express.json());


const todoRoutes = require("./src/routes/todoRoutes");
const cors = require("cors");
const authRoutes = require("./src/routes/authroutes");
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api", todoRoutes);
app.get("/", (req,res)=>{
    res.send("Backend Running");
})
module.exports = app;