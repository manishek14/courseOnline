const express = require("express");
const controller = require("../../controllers/v1/category");
const authMiddle = require("../../middleware/auth");
const isAdminMiddle = require("../../middleware/isAdmin");

const router = express.Router();

router
  .route("/")
  .post(authMiddle.authenticate, isAdminMiddle, controller.createCats)
  .get(authMiddle.authenticate, isAdminMiddle, controller.getAllCats);

router
  .route("/:id")
  .delete(authMiddle.authenticate, isAdminMiddle, controller.rmCats)
  .put(authMiddle.authenticate, isAdminMiddle, controller.updateCats);

module.exports = router;
