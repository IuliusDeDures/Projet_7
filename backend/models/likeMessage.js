const config = {
  username:'Groupomania',
  password:'$Group001',
  database:'groupomania',
  dialect:'mysql',
  host:'localhost',
};

  const Sequelize = require("sequelize");
  const database = new Sequelize(config);
  
  const LikeMessage = database.define("LikeMessage", {
    idMessage: { type: Sequelize.INTEGER },
    userPseudo: { type: Sequelize.STRING },
    likeMessage: { type: Sequelize.BOOLEAN, default: false },    
  });
  
  module.exports = database.models.LikeMessage;