const { company_table, Order, Product } = require("../models");

// Contrôleur pour obtenir tous les produits d'une entreprise spécifique
const getAllTable = async (req, res) => {
  const { company_id } = req.params;

  try {
    // Trouver toutes les tables associées à une entreprise spécifique avec leurs produits via les commandes
    const tables = await company_table.findAll({
      where: { company_id },
      include: [
        {
          model: Order,
          include: [
            {
              model: Product, // Inclure le modèle Product
              as: "product", // Utiliser l'alias défini dans l'association Order -> Product
            },
          ],
        },
      ],
    });

    res.json(tables);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des tables et produits:",
      error
    );
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  getAllTable,
};
