const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, deleteProduct, updateProduct } = require('../controllers/productController');  // Chemin correct

// Définir les routes et associer les contrôleurs
router.get('/:company_id', getAllProducts);
router.post('/', createProduct);
router.delete('/product/:id', deleteProduct);
router.put('/product/update/:id', updateProduct)

module.exports = router;