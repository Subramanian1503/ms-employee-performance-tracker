const express = require("express");
const user_router = require("../router/user");

// Defining the router from express library
const router = express.Router();

router.use("/user", user_router);

module.exports = router;
