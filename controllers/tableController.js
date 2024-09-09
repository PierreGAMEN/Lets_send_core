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

const createTable = async (req, res) => {
  const { company_id, table_number } = req.body;
  try {
    // Créer un nouveau produit sans spécifier l'ID
    const newTable = await company_table.create({
      company_id, 
      table_number: table_number
    });

    res.status(201).json(newTable);
  } catch (error) {
    console.error('Erreur lors de la création de la table:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const deleteTable = async (req, res) => {
  const {id} = req.params;
  try  {
    const table = await company_table.findByPk(id);
    await table.destroy(); // Supprimer la table
    res.status(200).json({ message: "Table supprimée avec succès" });
  } catch {
    console.error("Erreur lors de la suppression de la table:", error);
    res.status(500).json({ message: "Erreur lors de la suppression de la table" });
  }
}

const updateTable = async (req, res) => {
  const {id} = req.params;
  const {table_number} = req.body
  const table = await company_table.findByPk(id)
  if (!table) {
    return res.status(404).json({ message: 'Table non trouvé' });
  }
  try  {

     // Mise à jour du produit
    table.table_number = table_number;

    // Sauvegarde du produit mis à jour
    await table.save();
    res.status(200).json({ message: "Table modifiée avec succès" });
  } catch {
    console.error("Erreur lors de la modification de la table:", error);
    res.status(500).json({ message: "Erreur lors de la modification de la table" });
  }
}

module.exports = {
  getAllTable,
  createTable,
  deleteTable,
  updateTable
};
