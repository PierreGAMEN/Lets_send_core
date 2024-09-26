const express = require('express');
const router = express.Router();
const { createOrder, getAllOrder, updateOrderStatus, deleteOrder, updateOrderPaymentStatus } = require('../controllers/orderControllers');

// Définir les routes et associer les contrôleurs
router.post('/', createOrder);
router.get('/all', getAllOrder)
router.delete('/delete/:order_id', deleteOrder)
router.put('/payment/:id', updateOrderPaymentStatus)
router.put('/:id/status', updateOrderStatus)


module.exports = router;