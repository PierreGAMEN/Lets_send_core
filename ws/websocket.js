const WebSocket = require("ws");
const { Order } = require("../models"); // Assurez-vous que le chemin est correct

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("Client WebSocket connecté");

    ws.on("message", async (message) => {
      try {
        const data = JSON.parse(message);
        const { action } = data; // On récupère l'action d'abord

        console.log("Message reçu:", { action }); // Log pour vérifier le contenu du message

        if (action === "createOrder") {
          const { order } = data; // On récupère l'objet 'order' seulement si l'action est 'createOrder'
          console.log("Message reçu:", { data });
          const orders = [];
          for (const item of order.items) {
            console.log(order.company_id);
            const newOrder = await Order.create({
              product_id: item.id,
              table_id: order.id_table,
              company_id: order.company_id,
              table_number: order.table_number,
              status: "preparation",
              comment: item.comment,
              payment: order.payment,
            });
            orders.push(newOrder);
          }

          // Envoyer une confirmation aux clients
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({
                  action: "orderStatus",
                  status: "success",
                  orders,
                })
              );
            }
          });
        } else if (action === "orderUpdated") {
          const { orderId, status } = data; // On récupère 'orderId' et 'status' seulement si l'action est 'orderUpdated'

          // Envoyer une mise à jour aux clients
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({
                  action: "orderStatus",
                  status: "updated",
                  orderId,
                  newStatus: status,
                })
              );
            }
          }); 
        } else if (action === "orderDeleted") {
          const { orderId } = data; 
          console.log(`Suppression de la commande`);

          // Envoyer une notification de suppression aux clients
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({
                  action: "orderStatus",
                  status: "deleted",
                  orderId,
                })
              );
            }
          });
        } else if (action === "orderPaymentUpdated") {
          const { orderId } = data; 
          console.log(`Order payed`);

          // Envoyer une notification de suppression aux clients
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({
                  action: "orderStatus",
                  status: "payed",
                  orderId,
                })
              );
            }
          });
        }
      } catch (error) {
        console.error("Erreur lors du traitement du message:", error);

        ws.send(
          JSON.stringify({
            action: "orderStatus",
            status: "error",
            message: "Erreur lors du traitement de la commande",
          })
        );
      }
    });

    ws.on("close", () => {
      console.log("Client WebSocket déconnecté");
    });
  });
};

module.exports = {
  setupWebSocket,
};
