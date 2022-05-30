const config = {
  username:'Groupomania',
  password:'$Group001',
  database:'groupomania',
  dialect:'mysql',
  host:'localhost',
};

const Sequelize = require("sequelize");
const database = new Sequelize(config);

const User = database.define("Users", {
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  pseudo: { type: Sequelize.STRING, allowNull: false, unique: true },
  password: { type: Sequelize.STRING, allowNull: false },
  isAdmin: {type: Sequelize.BOOLEAN, default: false},
});

module.exports = database.models.Users;
