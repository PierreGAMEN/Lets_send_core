const { Transaction } = require("../models");

// Contrôleur pour obtenir tous les produits d'une entreprise spécifique
const createTransaction = async (req, res) => {
  const { amount, date, self_payment, company_id } = req.body;
  try {
    // Créer une nouvelle entrée de transaction
    const newTransaction = await Transaction.create({
      amount: amount,
      date: date,
      self_payment: self_payment,
      company_id: company_id
    });

    // Retourne la transaction créée en réponse
    return res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Erreur lors de la création de la transaction :", error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la création de la transaction" });
  }
};

module.exports = {
    createTransaction,
};
