const Commentaire = require("../models/commentaires");
const Message = require("../models/messages");
const LikeCommentaire = require("../models/likeCommentaire");
const LikeMessage = require("../models/likeMessage");


// route pour  créer un  like de commentaire
exports.createLikeCommentaire = (req, res, next) => {  
    const likeCommentaire = new LikeCommentaire({
      idCommentaire: req.body.idCommentaire,
      userPseudo: req.auth.userPseudo,
      likeCommentaire: req.body.likeCommentaire,   
              
    }); 
    let nbrLikeCommentaire = req.body.nbrLikeCommentaire
    const idCommentaire = req.body.idCommentaire    
    const modifNbrLikeCommentaire = {likes: nbrLikeCommentaire + 1, updateAt: Date.now()};         
    
    likeCommentaire
    .save()
     .then(() => res.status(201).json({ message: "Like de commentaire enregistré !" }))
     .catch((error) => res.status(400).json({ error })); 
     Commentaire.findOne({where: {id: idCommentaire}}) 
     .then(()=>{
        Commentaire.update(modifNbrLikeCommentaire, { where: {id: idCommentaire} })
        .catch((error) => res.status(403).json({ error }));
     }     
     )     
  }
;

// route pour  créer un  like de message
exports.createLikeMessage = (req, res, next) => {  
    const likeMessage = new LikeMessage({
      idMessage: req.body.idMessage,
      userPseudo: req.auth.userPseudo,
      likeMessage: req.body.likeMessage,               
    }); 
    let nbrLikeMessage = req.body.nbrLikeMessage
    const idMessage = req.body.idMessage    
    const modifNbrLikeMessage = {likes: nbrLikeMessage + 1 , updateAt: Date.now()};    
    likeMessage
    .save()
     .then(() => res.status(201).json({ message: "Like de message enregistré !" }))
     .catch((error) => res.status(400).json({ error }));
     Message.findOne({where: {id: idMessage}}) 
        .then(()=>{
            Message.update(modifNbrLikeMessage, { where: {id: idMessage} })
        .catch((error) => res.status(403).json({ error }));
        })         
  };


// route pour supprimer un like de commentaire
exports.deleteLikeCommentaire = (req, res, next) => {
  const likeCommentaireId = req.params.id;
  
  LikeCommentaire.findOne({ where: { id: likeCommentaireId } })
    .then((likeCommentaire) => {
      if (likeCommentaire.userPseudo == req.auth.userPseudo) {
                     
        LikeCommentaire.destroy({ where: { id: likeCommentaireId } })
            .then(() => res.status(200).json({ message: "Like de commentaire supprimé !" }))
            .catch((error) => res.status(403).json({ error }));        
        
      } else {
        res.status(401).json({
          error: "Utilisateur non valide !",
        });
      }
    })
    .catch((error) => res.status(503).json({ error }));
};

// route pour supprimer un like de message
exports.deleteLikeMessage = (req, res, next) => {
    const likeMessageId = req.params.id;    
    LikeMessage.findOne({ where: { idMessage: likeMessageId } })
      .then((likeMessage) => {
        if (likeMessage.userPseudo == req.auth.userPseudo) {
                       
            LikeMessage.destroy({ where: { idMessage: likeMessageId } })
              .then(() => res.status(200).json({ message: "Like de message supprimé !" }))
              .catch((error) => res.status(403).json({ error }));        
          
        } else {
          res.status(401).json({
            error: "Utilisateur non valide !",
          });
        }
      })
      .catch((error) => res.status(503).json({ error }));
  };
  

// route pour modifier le nombre de commentaire
exports.modifNbrLikeCommentaire = (req, res, next) => {
    let nbrLikeCommentaire = req.body.nbrLikeCommentaire
      const likeCommentaireId = req.body.idCommentaire    
      const modifNbrLikeCommentaire = {likes: nbrLikeCommentaire - 1, updateAt: Date.now()};         
          
      Commentaire.findOne({where: {id: likeCommentaireId}}) 
       .then(()=>{
        Commentaire.update(modifNbrLikeCommentaire, { where: {id: likeCommentaireId} })
       }) 
       .catch((error) => res.status(403).json({ error }));     
  }

// route pour modifier le nombre de message
exports.modifNbrLikeMessage = (req, res, next) => {
    let nbrLikeMessage = req.body.nbrLikeMessage
      const likeMessageId = req.body.idMessage    
      const modifNbrLikeMessage = {likes: nbrLikeMessage - 1, updateAt: Date.now()};         
          
      Message.findOne({where: {id: likeMessageId}}) 
       .then(()=>{
        Message.update(modifNbrLikeMessage, { where: {id: likeMessageId} })
       }) 
       .catch((error) => res.status(403).json({ error }));     
  }


// route pour afficher les likes commentaires
exports.getLikeCommentaire = (req, res, next) => {
    LikeCommentaire.findAll()
    .then((likeCommentaire) => {
      res.status(200).json(likeCommentaire);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// route pour afficher les likes message
exports.getLikeMessage = (req, res, next) => {
    LikeMessage.findAll()
    .then((likeMessage) => {
      res.status(200).json(likeMessage);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};


