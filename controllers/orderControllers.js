const { Order, Product } = require("../models");

const createOrder = async (req, res) => {
  const { items, id_table, company_id } = req.body;

  try {
    const orders = [];

    for (const item of items) {
      const newOrder = await Order.create({
        product_id: item.id,
        table_id: id_table,
        company_id: company_id,
        comment: item.comment
      });
      orders.push(newOrder);
    }

    res.status(201).json(orders);
  } catch (error) {
    console.error("Erreur lors de la création de la commande:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const getAllOrder = async (req, res) => {
  const { company_id } = req.query;
  try {
    const orders = await Order.findAll({
      where: { company_id },
      include: [
        {
          model: Product, // Modèle de produit à inclure
          as: "product", // Alias défini dans la relation (si nécessaire)
        },
      ],
    });

    res.json(orders);
  } catch (err) {
    console.error("Erreur lors de l'obtention des commande:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
      const order = await Order.findByPk(id);
      if (!order) {
          return res.status(404).json({ message: 'Commande non trouvée' });
      }

      order.status = status;
      await order.save();

      res.json(order);
  } catch (err) {
      console.error("Erreur lors de la mise à jour du statut de la commande:", err);
      res.status(500).json({ message: "Erreur serveur" });
  }
};


module.exports = {
  createOrder,
  getAllOrder,
  updateOrderStatus,
};
