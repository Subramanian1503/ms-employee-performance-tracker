const express = require("express");
const passport = require("passport");
const user_controller = require("../controller/server/user");
const user_pagerender = require("../controller/page_renderer/user");

// Defining the router from express library
const router = express.Router();

// Defining the routers for client URLS
router.get("/signIn", user_pagerender.signIn);
router.get("/signUp", user_pagerender.signUp);

// Defining the routers for server action processor URLS
router.post("/create", user_controller.create_user);
router.get("/delete/:id",  user_controller.delete_user);
router.post("/update/:id",  user_controller.update_user);
router.post(
  "/create_session",
  passport.authenticate("local", {
    failureRedirect: "/user/signIn",
  }),
  user_controller.create_session
);
router.get(
  "/destory_session",
  user_controller.destroySession
);

module.exports = router;
