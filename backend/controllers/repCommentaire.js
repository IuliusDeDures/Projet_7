const RepCommentaire = require("../models/repCommentaires");
const jwt = require("jsonwebtoken");
const Message = require("../models/messages");
const Commentaire = require("../models/commentaires")


// route pour  créer une réponse de commentaire
exports.createRepCommentaire = (req, res, next) => {  
    const repCommentaire = new RepCommentaire({
      idCommentaire: req.body.idCommentaire,
      userPseudo: req.auth.userPseudo,
      repCommentaire: req.body.repCommentaire,             
    }); 
    let nbrRepCommentaire = req.body.nbrRepCommentaire
    let nbrRepCommentaireCom = req.body.nbrRepCommentaireCom
    const idMessage = req.body.idMessage    
    const modifNbrRepCommentaire = {nbrRepCommentaire: nbrRepCommentaire + 1, updateAt: Date.now()};   
    const modifNbrRepCommentaireCom = {nbrRepCommentaireCom: nbrRepCommentaireCom + 1, updateAt: Date.now()};
    const idCommentaire = req.body.idCommentaire
    repCommentaire
    .save()
     .then(() => res.status(201).json({ message: "Réponse de commentaire enregistré !" }))
     .catch((error) => res.status(400).json({ error })); 
     Message.findOne({where: {id: idMessage}}) 
     .then(()=>{
      Message.update(modifNbrRepCommentaire, { where: {id: idMessage} })
     }     
     )  
     Commentaire.findOne({where: {id: idCommentaire}}) 
     .then(()=>{
      Commentaire.update(modifNbrRepCommentaireCom, { where: {id: idCommentaire} })
     }     
     )   
  }
;


// route pour supprimer une réponse de commentaire
exports.deleteRepCommentaire = (req, res, next) => {
  const repCommentaireId = req.params.id;
  
  RepCommentaire.findOne({ where: { id: repCommentaireId } })
    .then((repCommentaire) => {
      if (repCommentaire.userPseudo == req.auth.userPseudo) {               
             
        RepCommentaire.destroy({ where: { id: repCommentaireId } })
            .then(() => res.status(200).json({ message: "Réponse de commentaire supprimé !" }))
            .catch((error) => res.status(403).json({ error }));        
        
      } else {
        res.status(401).json({
          error: "Utilisateur non valide !",
        });
      }
    })
    .catch((error) => res.status(503).json({ error }));
};

// route pour modifier le nombre de réponse de commentaires
exports.modifNbrRepCommentaire = (req, res, next) => {
  let nbrRepCommentaire = req.body.nbrRepCommentaire
  let nbrRepCommentaireCom = req.body.nbrRepCommentaireCom
  const idMessage = req.body.idMessage    
  const idCommentaire = req.body.idCommentaire
  const modifNbrRepCommentaire = {nbrRepCommentaire: nbrRepCommentaire - 1, updateAt: Date.now()};      
  const modifNbrRepCommentaireCom = {nbrRepCommentaireCom: nbrRepCommentaireCom - 1, updateAt: Date.now()};
        
     Message.findOne({where: {id: idMessage}}) 
     .then(()=>{
      Message.update(modifNbrRepCommentaire, { where: {id: idMessage} })
     })  
     Commentaire.findOne({where: {id: idCommentaire}}) 
     .then(()=>{
      Commentaire.update(modifNbrRepCommentaireCom, { where: {id: idCommentaire} })
     })       
}

// route pour afficher l'ensemble des réponse de commentaires
exports.getAllRepCommentaire = (req, res, next) => {
    RepCommentaire.findAll()
    .then((repCommentaire) => {
      res.status(200).json(repCommentaire);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// route pour afficher une réponse de commentaire
exports.getOneRepCommentaire = (req, res, next) => {
  const repCommentaireId = req.params.id;
  RepCommentaire.findOne({ where: { id: repCommentaireId } })
    .then((repCommentaire) => {
      res.status(200).json(repCommentaire);
    })
    .catch((error) => res.status(404).json({ error }));
};