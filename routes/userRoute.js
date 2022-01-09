const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createOrUpdateUser,
  getSingleUser,
  showCurrentUser,
  currentUser,

  updateUser,
} = require("../controller/userController");
const { auth, adminCkeck } = require("../middleware/auth");

// router.route("/").get(authenticateUser, authorizeRoles("admin"), getAllUsers);
// router.route("/showMe").get(authenticateUser, showCurrentUser);
// router.route("/updatePassword").patch(authenticateUser, updatePassword);
// router.route("/updateUser").patch(authenticateUser, updateUser);
// router.route("/:id").get(getSingleUser);
router.post("/createOrUpdateUser", auth, createOrUpdateUser);
router.post("/currentUser", auth, adminCkeck, currentUser);
router.route("/").get(getAllUsers);

module.exports = router;
