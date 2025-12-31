const express = require("express")
const controller = require("../../controllers/v1/user")
const authMiddle = require("../../middleware/auth")
const isAdminMiddle = require("../../middleware/isAdmin")

const router = express.Router()

router.route("/ban/:id" ).put(authMiddle.authenticate , isAdminMiddle, controller.ban)

module.exports = router