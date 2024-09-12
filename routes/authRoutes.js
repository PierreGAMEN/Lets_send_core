const express = require("express");
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAllUsersByCompany,
} = require("../controllers/authController");
const router = express.Router();

// Définir les routes et associer les contrôleurs

router.post("/", getUser);
router.post("/create", createUser);
router.post("/getAllUsers", getAllUsersByCompany)
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
