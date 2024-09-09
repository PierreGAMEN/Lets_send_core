const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false,
});


// Importation des modèles
const Company = require('./company')(sequelize);
const Product = require('./product')(sequelize);
const company_table = require('./company_table')(sequelize);
const Order = require('./order')(sequelize);
const Users = require('./users')(sequelize);

// Définition des associations
Company.hasMany(Product, { foreignKey: 'company_id', onDelete: 'CASCADE' });
Company.hasMany(Users, { foreignKey: 'company_id', onDelete: 'CASCADE' });
Product.belongsTo(Company, { foreignKey: 'company_id' });

Company.hasMany(company_table, { foreignKey: 'company_id', onDelete: 'CASCADE' });
company_table.belongsTo(Company, { foreignKey: 'company_id' });

Product.belongsToMany(company_table, { through: Order, foreignKey: 'product_id' });
company_table.belongsToMany(Product, { through: Order, foreignKey: 'table_id' });
company_table.hasMany(Order, { foreignKey: 'table_id', onDelete: 'CASCADE' });


Order.belongsTo(Product, {
  foreignKey: 'product_id',  // Clé étrangère dans order_table
  as: 'product'              // Alias pour l'inclusion
});
// Exportation des modèles et de la connexion Sequelize
module.exports = {
  sequelize,
  Company,
  Product,
  company_table,
  Order,
  Users
};
