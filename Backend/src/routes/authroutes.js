const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authcontroller");
router.post("/login", loginUser);

router.post("/register", registerUser);

module.exports = router;