const config = {
  username: "root",
  password: "$49JulBau72$",
  database: "groupomania",
  host: "localhost",
  dialect: "mysql",
};
const Sequelize = require("sequelize");
const database = new Sequelize(config);

const User = database.define("Users", {
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  pseudo: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false },
});

module.exports = database.models.Users;
