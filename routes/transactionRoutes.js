const express = require("express");
const { createTransaction } = require("../controllers/transactionController");
const router = express.Router();

// Définir les routes et associer les contrôleurs

router.post('/create', createTransaction);

module.exports = router;