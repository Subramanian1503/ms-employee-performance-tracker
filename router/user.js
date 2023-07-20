const express = require("express");
const passport = require("passport");
const user_processor = require("../controller/processor/user");

// Defining the router from express library
const router = express.Router();

// Defining the routers for client URLS
router.post("/signIn", )

// Defining the routers for server action processor URLS
router.post("/create", user_processor.create);

router.get(
  "/create_session",
  passport.authenticate("local", {
    failureRedirect: "/user/signIn",
  }),
  user_processor.create_session
);

module.exports = router;
