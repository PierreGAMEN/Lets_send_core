require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebSocket } = require('./ws/websocket');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/api', routes);

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
server.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
