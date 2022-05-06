const Commentaire = require("../models/commentaires");
const jwt = require("jsonwebtoken");
const Message = require("../models/messages");


// route pour  créer un commentaire
exports.createCommentaire = (req, res, next) => {  
    const commentaire = new Commentaire({
      idMessage: req.body.idMessage,
      userPseudo: req.auth.userPseudo,
      commentaire: req.body.commentaire,
      likes: 0, 
      nbrRepCommentaireCom: 0,     
    }); 
    let nbrCommentaire = req.body.nbrCommentaire
    const idMessage = req.body.idMessage    
    const modifNbrCommentaire = {nbrCommentaire: nbrCommentaire + 1, updateAt: Date.now()};         
    
    commentaire
    .save()
     .then(() => res.status(201).json({ message: "Commentaire enregistré !" }))
     .catch((error) => res.status(400).json({ error })); 
     Message.findOne({where: {id: idMessage}}) 
     .then(()=>{
      Message.update(modifNbrCommentaire, { where: {id: idMessage} })
     }     
     )     
  }
;

// route pour supprimer un commentaire
exports.deleteCommentaire = (req, res, next) => {
  const commentaireId = req.params.id;
  
  Commentaire.findOne({ where: { id: commentaireId } })
    .then((commentaire) => {
      if (commentaire.userPseudo == req.auth.userPseudo) {
                     
        Commentaire.destroy({ where: { id: commentaireId } })
            .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
            .catch((error) => res.status(403).json({ error }));        
        
      } else {
        res.status(401).json({
          error: "Utilisateur non valide !",
        });
      }
    })
    .catch((error) => res.status(503).json({ error }));
};

// route pour modifier le nombre de commentaires
exports.modifNbrCommentaire = (req, res, next) => {
  let nbrCommentaire = req.body.nbrCommentaire
    const idMessage = req.body.idMessage    
    const modifNbrCommentaire = {nbrCommentaire: nbrCommentaire - 1, updateAt: Date.now()};         
        
     Message.findOne({where: {id: idMessage}}) 
     .then(()=>{
      Message.update(modifNbrCommentaire, { where: {id: idMessage} })
     })      
}

// route pour afficher l'ensemble des commentaires
exports.getAllCommentaire = (req, res, next) => {
    Commentaire.findAll()
    .then((commentaire) => {
      res.status(200).json(commentaire);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// route pour afficher un commentaire
exports.getOneCommentaire = (req, res, next) => {
  const commentaireId = req.params.id;
  Commentaire.findOne({ where: { id: commentaireId } })
    .then((commentaire) => {
      res.status(200).json(commentaire);
    })
    .catch((error) => res.status(404).json({ error }));
};