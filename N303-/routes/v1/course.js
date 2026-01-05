const express = require("express");
const authMiddle = require("../../middleware/auth");
const isAdminMiddle = require("../../middleware/isAdmin");
const controller = require("../../controllers/v1/course");
const uploader = require("../../utils/uploader");

const router = express.Router();

router
  .route("/")
  .post(uploader.single("cover") ,authMiddle.authenticate, isAdminMiddle, controller.create);

router
  .route("/:id/session")
  .get(controller.getSessions)
  .post(uploader.single("video"), authMiddle.authenticate, isAdminMiddle, controller.createSession);

module.exports = router;
