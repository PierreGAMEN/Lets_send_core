const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const company_table = sequelize.define('company_table', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    table_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'company_table',
    timestamps: false,
  });

  return company_table;
};
