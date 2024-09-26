// controllers/paymentController.js
const stripe = "../config/stripe.js";

const createCheckoutSession = async (req, res) => {
  const { amount } = req.body; // Le montant total de la transaction est envoyé depuis le frontend

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Transaction",
            },
            unit_amount: amount * 100, // Montant en centimes (par exemple 10.00€ devient 1000)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http:/localhost:5173/success",
      cancel_url: "http:/localhost:5173/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCheckoutSession };
