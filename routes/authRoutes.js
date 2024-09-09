const express = require("express");
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/authController");
const router = express.Router();

// Définir les routes et associer les contrôleurs

router.post("/", getUser);
router.post("/create", createUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
