const express = require("express");
const user_router = require("../router/user");
const user_pagerender = require("../controller/page_renderer/user");

// Defining the router from express library
const router = express.Router();

router.use("/user", user_router);

// Defining router for server URLS

// Defining router for client URLS
router.get("/", user_pagerender.signIn);

module.exports = router;
