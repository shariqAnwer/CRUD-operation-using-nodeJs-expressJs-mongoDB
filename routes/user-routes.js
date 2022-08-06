const express = require("express");
const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controller/user-controller");

const router = express.Router();

router.get("/", getAllUsers); //5000/users/user
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById); //get the user from the id

module.exports = router;
