const express = require("express");
const authMiddle = require("../../middleware/auth");
const isAdminMiddle = require("../../middleware/isAdmin");
const controler = require("../../controllers/v1/comment")

const router = express.Router();

router.route("/").post(authMiddle.authenticate , controler.createComment)

module.exports = router;