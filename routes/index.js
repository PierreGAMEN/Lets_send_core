const express = require('express');
const router = express.Router();
const productRoutes = require('./productRoutes');  // Chemin correct
const orderRoutes = require('./orderRoutes')
const authRoutes = require('./authRoutes')
const tableRoutes = require('./tableRoutes')
const transactionRoutes = require('./transactionRoutes')
const paymentRoutes = require('./paymentRoutes')

// Définir les routes et associer les contrôleurs
router.use('/menu', productRoutes);
router.use('/order', orderRoutes);
router.use('/auth', authRoutes);
router.use('/table', tableRoutes);
router.use('/transaction', transactionRoutes)
router.use('/payment', paymentRoutes)

module.exports = router;
