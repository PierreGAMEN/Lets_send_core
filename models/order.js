const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
    },
    table_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
    },
    table_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'preparation',
    },
  }, {
    tableName: 'order_table',
    timestamps: false,
  });

  return Order;
};
