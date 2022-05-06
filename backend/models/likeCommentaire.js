const config = {
    username: "root",
    password: "$49JulBau72$",
    database: "groupomania",
    dialect: "mysql",
    host: "localhost",
  };
  const Sequelize = require("sequelize");
  const database = new Sequelize(config);
  
  const LikeCommentaire = database.define("LikeCommentaire", {
    idCommentaire: { type: Sequelize.INTEGER, allowNull: false },
    userPseudo: { type: Sequelize.STRING, allowNull: false },
    likeCommentaire: { type: Sequelize.BOOLEAN, default: false },    
  });
  
  module.exports = database.models.LikeCommentaire;