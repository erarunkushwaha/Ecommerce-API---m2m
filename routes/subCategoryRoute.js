const express = require("express");
const router = express.Router();

const {
  create,
  list,
  read,
  update,
  remove,
} = require("../controller/subCategoryController");
const { auth, adminCkeck } = require("../middleware/auth");
router.route("/").post(create).get(list);
// auth, adminCkeck,
router
  .route("/:slug")
  .get(read)
  .patch(auth, adminCkeck, update)
  .delete(auth, adminCkeck, remove);
module.exports = router;
