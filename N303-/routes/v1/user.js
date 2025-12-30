const express = require("express")
const controller = require("../../controllers/v1/user")

const router = express.Router()

router.put("/ban/:id" , controller.ban)

module.exports = router