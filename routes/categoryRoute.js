const express = require("express");
const router = express.Router();

const {
  create,
  list,
  read,
  update,
  remove,
} = require("../controller/categoryController");
const { auth, adminCkeck } = require("../middleware/auth");
router.route("/").post(auth, adminCkeck, create).get(list);

// router
//   .route("/uploadImage")
//   .post([authenticateUser, authorizeRoles("admin")], uploadImage);
// router
//   .route("/:id")
//   .get(getSingleProduct)
//   .patch([authenticateUser, authorizeRoles("admin")], updateProduct)
//   .delete([authenticateUser, authorizeRoles("admin")], deleteProduct);
router
  .route("/:slug")
  .get(read)
  .patch(auth, adminCkeck, update)
  .delete(auth, adminCkeck, remove);
module.exports = router;
