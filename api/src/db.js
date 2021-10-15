require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize("verduleria", "dbUser", "dbPassword", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  timestamps: false,
  native: true,
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Para relacionarlos hacemos un destructuring
const { Media, Order, Product, Order_products } = sequelize.models;

Product.belongsToMany(Media, { through: "products_media" });
Product.belongsToMany(Order, { through: Order_products });
Order.belongsToMany(Product, { through: Order_products });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
