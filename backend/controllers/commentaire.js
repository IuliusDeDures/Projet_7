const Commentaire = require("../models/commentaires");
const jwt = require("jsonwebtoken");

// route pour  créer un commentaire
exports.createCommentaire = (req, res, next) => {  
    const commentaire = new Commentaire({
      idMessage: req.body.idMessage,
      userPseudo: req.auth.userPseudo,
      commentaire: req.body.commentaire,
      likes: 0,         
    });
    commentaire
    .save()
     .then(() => res.status(201).json({ message: "Commentaire enregistré !" }))
     .catch((error) => res.status(400).json({ error }));
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

// route pour modifier un commentaire
exports.modifyCommentaire = (req, res, next) => {
  const commentaireId = req.params.id;
  const modifCommentaire = { text: req.body.text, updateAt: Date.now() };
  
  Commentaire.findOne({ where: { id: commentaireId } })
    .then((commentaire) => {
      if (commentaire.userPseudo == req.auth.userPseudo) {
        Commentaire.update(modifCommentaire, { where: { id: commentaireId } })
          .then(() => res.status(200).json({ message: "Commentaire modifié !" }))
          .catch((error) => res.status(402).json({ error }));
      } else {
        res.status(403).json({
          error: "Utilisateur non valide !",
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// route pour liker un commentaire
exports.likeCommentaire = (req, res, next) => {
  const userPseudo = req.body.userPseudo;
  const like = req.body.likes;
  const modiflike = { likes: req.body.likes, updateAt: Date.now() };
  const commentaireId = req.params.id;
  Commentaire.findOne({ where: { id: commentaireId } })
    .then((commentaire) => {
      switch (like) {
        case 1:
          if (like == 1) {
            Commentaire.update(modiflike, { where: { id: commentaireId } })
              .then(() => res.status(201).json({ message: "Commentaire liké !" }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;
        case 0:
          if (like == 0) {
            Commentaire.update(modiflike, { where: { id: commentaireId } })
              .then(() =>
                res.status(201).json({ message: "Le commentaire n'est plus liké !" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          break;
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
