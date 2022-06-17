const Message = require("../models/messages");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const LikeMessage = require("../models/likeMessage")

// route pour  créer un message
exports.createMessage = (req, res, next) => {
  if (req.file) {    
    const message = new Message({      
      file: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
      userPseudo: req.auth.userPseudo,
      text: req.body.text,
      likes: 0,
      nbrCommentaire: 0,  
      nbrRepCommentaire : 0, 
      userPartage:req.body.userPartage,
      datePartage:req.body.datePartage,         
    });    
    message
      .save()
      .then(() => res.status(201).json({ message: "Message enregistré !" }))
      .catch((error) => res.status(400).json({ error }));
        
  } else {
    const message = new Message({
      userPseudo: req.auth.userPseudo,
      text: req.body.text,
      likes: 0,  
      nbrCommentaire: 0,  
      nbrRepCommentaire : 0,  
      userPartage:req.body.userPartage,
      datePartage:req.body.datePartage, 
      file:req.body.file       
    });
    message
    .save()
     .then(() => res.status(201).json({ message: "Message enregistré !" }))
     .catch((error) => res.status(400).json({ error }));
     }
};

// route pour supprimer un message
exports.deleteMessage = (req, res, next) => {
  const messageId = req.params.id;
  Message.findOne({ where: { id: messageId } })
    .then((message) => {
      if (message.userPseudo == req.auth.userPseudo) {
        if (req.file) {
          const filename = message.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Message.destroy({ where: { id: messageId } })
              .then(() =>
                res.status(200).json({ message: "Message supprimé !" })
              )
              .catch((error) => res.status(403).json({ error }));
          });
        } else {
          Message.destroy({ where: { id: messageId } })
            .then(() => res.status(200).json({ message: "Message supprimé !" }))
            .catch((error) => res.status(403).json({ error }));
        }
      } else {
        res.status(401).json({
          error: "Utilisateur non valide !",
        });
      }
    })

    .catch((error) => res.status(503).json({ error }));
};

// route pour supprimer un message (administrateur)
exports.deleteMessageAdmin = (req, res, next) => {
  const messageId = req.params.id;
  Message.findOne({ where: { id: messageId } })
    .then((message) => {      
        if (req.file) {
          const filename = message.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Message.destroy({ where: { id: messageId } })
              .then(() =>
                res.status(200).json({ message: "Message supprimé !" })
              )
              .catch((error) => res.status(403).json({ error }));
          });
        } else {
          Message.destroy({ where: { id: messageId } })
            .then(() => res.status(200).json({ message: "Message supprimé !" }))
            .catch((error) => res.status(403).json({ error }));
        }      
    })
    .catch((error) => res.status(503).json({ error }));
};

// route pour afficher l'ensemble des messages
exports.getAllMessage = (req, res, next) => {
  Message.findAll()
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// route pour afficher un message
exports.getOneMessage = (req, res, next) => {
  const messageId = req.params.id;
  Message.findOne({ where: { id: messageId } })
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((error) => res.status(404).json({ error }));
};