const express = require("express");
const  user_processor = require("../controller/processor/user");

// Defining the router from express library
const router = express.Router();

// Defining the routers for client URLS

// Defining the routers for server action processor URLS
router.post("/create", user_processor.create);

module.exports = router;
