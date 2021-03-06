const config = {
  username:'Groupomania',
  password:'$Group001',
  database:'groupomania',
  dialect:'mysql',
  host:'localhost',
};

  const Sequelize = require("sequelize");
  const database = new Sequelize(config);
  
  const Commentaire = database.define("Commentaire", {
    idMessage: { type: Sequelize.INTEGER, allowNull: false },
    userPseudo: { type: Sequelize.STRING },
    commentaire: { type: Sequelize.STRING, allowNull: false },  
    likes: { type: Sequelize.INTEGER },
    nbrRepCommentaireCom : { type: Sequelize.INTEGER },
  });
  
  module.exports = database.models.Commentaire;
  