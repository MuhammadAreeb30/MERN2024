const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getAllContacts,
  getUserById,
  updateUserById,
  deleteUserById,
  deleteContactById,
} = require("../controllers/users-controller");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

router.route("/users").get(authMiddleware, adminMiddleware, getAllUsers);
router.route("/users/:id").get(authMiddleware, adminMiddleware, getUserById);
router
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, updateUserById);
router.route("/users/delete/:id").delete(authMiddleware, deleteUserById);
router.route("/contacts").get(authMiddleware, adminMiddleware, getAllContacts);
router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteContactById);

module.exports = router;
