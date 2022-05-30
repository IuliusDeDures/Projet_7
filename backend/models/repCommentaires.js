const config = {
  username:'Groupomania',
  password:'$Group001',
  database:'groupomania',
  dialect:'mysql',
  host:'localhost',
};

  const Sequelize = require("sequelize");
  const database = new Sequelize(config);
  
  const ReponseCommentaire = database.define("ReponseCommentaire", {
    idCommentaire: { type: Sequelize.INTEGER, allowNull: false },
    userPseudo: { type: Sequelize.STRING },
    repCommentaire: { type: Sequelize.STRING, allowNull: false },  
    
  });
  
  module.exports = database.models.ReponseCommentaire;
  