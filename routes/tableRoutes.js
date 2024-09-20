const express = require("express");
const { getAllTable, createTable, deleteTable, updateTable, getOneTableWithCompanyIdAndTableNumber } = require("../controllers/tableController");
const router = express.Router();

// Définir les routes et associer les contrôleurs

router.post('/create', createTable);
router.delete("/delete/:id", deleteTable)
router.put("/update/:id", updateTable)
router.get("/:company_id", getAllTable);
router.get("/:company_id/:table_number", getOneTableWithCompanyIdAndTableNumber)

module.exports = router;
