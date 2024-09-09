const express = require('express');
const router = express.Router();
const { createOrder, getAllOrder, updateOrderStatus } = require('../controllers/orderControllers');

// Définir les routes et associer les contrôleurs
router.post('/', createOrder);
router.get('/all', getAllOrder)
router.put('/:id/status', updateOrderStatus)


module.exports = router;