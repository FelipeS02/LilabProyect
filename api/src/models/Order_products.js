const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Order_products = sequelize.define(
    "order_products",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return Order_products;
};
