const express = require("express");
const performance_review = require("../controller/server/performance_review_metadata");
const passport = require("passport");

const router = express.Router();

router.post("/create-admin", performance_review.create_review_by_admin);

router.post("/assign", performance_review.assign_review);
router.get("/update/:id", performance_review.update_status)
router.post("/create/:id", performance_review.create_review_by_employee);
module.exports = router;