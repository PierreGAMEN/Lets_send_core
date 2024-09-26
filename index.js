require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebSocket } = require('./ws/websocket');

const app = express();
const port = process.env.PORT || 3000;

;

// Configuration des options CORS
const corsOptions = {
  origin: "http://192.168.1.19:5173", // Remplacez par votre domaine frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Méthodes autorisées
  credentials: true, // Autorise l'envoi de cookies ou autres credentials
  allowedHeaders: ["Content-Type", "Authorization"], // Headers autorisés
};

// Appliquer CORS avec les options
app.use(cors(corsOptions));

// Gérer les requêtes OPTIONS (preflight)
app.options("*", cors(corsOptions));

// Middlewares
app.use(express.json());
app.use('/api', routes)


// Serveur HTTP
const server = http.createServer(app);

// Initialisation des WebSockets
setupWebSocket(server);

// Connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie.');
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données:', err);
  });

// Démarrer le serveur
server.listen(port, process.env.IPV6, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
