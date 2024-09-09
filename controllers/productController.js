const { Product } = require('../models');

// Contrôleur pour obtenir tous les produits d'une entreprise spécifique
const getAllProducts = async (req, res) => {
  const { company_id } = req.params;

  try {
    // Trouver tous les produits associés à une entreprise spécifique
    const products = await Product.findAll({
      where: { company_id }
    });

    res.json(products);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Contrôleur pour créer un nouveau produit
const createProduct = async (req, res) => {
  const { company_id, name, description, image, price, category, sub_category } = req.body;

  try {
    // Créer un nouveau produit sans spécifier l'ID
    const newProduct = await Product.create({
      company_id,
      name,
      description,
      image,
      price,
      category,
      sub_category
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    // Rechercher le produit par ID et le supprimer
    const product = await Product.findByPk(productId);
    
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    await product.destroy(); // Supprimer le produit
    res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);
    res.status(500).json({ message: "Erreur lors de la suppression du produit" });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, description, price, category, sub_category } = req.body;

  try {
    // Recherche du produit par ID
    const product = await Product.findByPk(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    // Mise à jour du produit
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.sub_category = sub_category;

    // Sauvegarde du produit mis à jour
    await product.save();

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour du produit" });
  }
};






module.exports = {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct
};
