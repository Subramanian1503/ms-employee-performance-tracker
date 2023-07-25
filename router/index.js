const express = require("express");
const user_router = require("../router/user");
const passport = require("passport");
const performance_review_metadata_router = require("../router/performance_review_metadata");

const user_pagerender = require("../controller/page_renderer/user");

const admin_controller = require("../controller/server/admin");
const employee_controller = require("../controller/server/employee");

// Defining the router from express library
const router = express.Router();

router.use("/user", user_router);
router.use("/performance_review_metadata", performance_review_metadata_router);

// Defining router for server URLS

// Defining router for client URLS
router.get("/", user_pagerender.signIn);
router.get("/admin", admin_controller.admin_page);
router.get("/employee", employee_controller.employee_page);

module.exports = router;
