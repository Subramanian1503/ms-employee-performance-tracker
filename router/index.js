const express = require("express");
const user_router = require("../router/user");

// Defining the router from express library
const router = express.Router();

router.use("/user", user_router);

// Defining router for server URLS

// Defining router for client URLS

module.exports = router;
