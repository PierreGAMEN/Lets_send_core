# Gestion des Tâches pour Bars et Restaurants - Back-End

## Description

Ce projet back-end fait partie d'un système complet de gestion des tâches pour les bars et restaurants. L'API fournit des fonctionnalités pour faciliter la prise de commande, l'envoi des commandes à la cuisine et au bar, et la gestion des serveurs. 

Elle permet :
- La **prise de commande** des produits (boissons, plats, desserts, etc.).
- La **synchronisation des commandes** entre les différentes parties prenantes (cuisine, bar, serveurs).
- La **gestion des produits** et des catégories de produits.
- La **visualisation en temps réel** de l'état des commandes et leur statut (en cours, servie, annulée).

## Fonctionnalités

- Gestion des commandes avec liaison aux produits via une base de données relationnelle.
- Support des opérations de prise, d'envoi et de gestion des commandes pour la cuisine et le bar.
- API REST permettant la communication avec le front-end et les terminaux des serveurs.
- Gestion des produits et des catégories dans la base de données.
- Mise à jour en temps réel des commandes avec WebSockets.

## Technologies

- **Node.js** : Utilisé pour créer le serveur back-end et gérer les requêtes API.
- **Express.js** : Framework web pour construire des API RESTful.
- **Sequelize** : ORM utilisé pour interagir avec PostgreSQL.
- **PostgreSQL** : Base de données relationnelle pour stocker les informations des commandes et produits.
- **WebSockets** : Pour gérer les notifications et la mise à jour en temps réel des commandes.
- **dotenv** : Pour gérer les variables d'environnement.

