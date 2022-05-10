const config = {
  username: "root",
  password: "$49JulBau72$",
  database: "groupomania",
  dialect: "mysql",
  host: "localhost",
};
const Sequelize = require("sequelize");
const database = new Sequelize(config);

const Message = database.define("Message", {
  userPseudo: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING(500), allowNull: false },
  file: { type: Sequelize.STRING },
  likes: { type: Sequelize.INTEGER },
  nbrCommentaire : { type: Sequelize.INTEGER },
  nbrRepCommentaire : { type: Sequelize.INTEGER },
});

module.exports = database.models.Message;
