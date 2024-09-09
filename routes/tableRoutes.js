const express = require("express");
const { getAllTable } = require("../controllers/tableController");
const router = express.Router();

// Définir les routes et associer les contrôleurs

router.get("/:company_id", getAllTable);

module.exports = router;
