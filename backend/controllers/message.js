const Message = require("../models/messages");
const fs = require("fs");
const jwt = require("jsonwebtoken");

// route pour  créer un message
exports.createMessage = (req, res, next) => {
  if (req.file) {
    
    const message = new Message({      
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
      userPseudo: req.auth.userPseudo,
      text: req.body.text,
      likes: 0,            
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

// route pour modifier un message
exports.modifyMessage = (req, res, next) => {
  const messageId = req.params.id;
  const modifMessage = { text: req.body.text, updateAt: Date.now() };
  const messageObject = req.file
    ? {
        ...JSON.parse(req.body.message),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Message.findOne({ where: { id: messageId } })
    .then((message) => {
      if (message.userPseudo == req.auth.userPseudo) {
        Message.update(modifMessage, { where: { id: messageId } })
          .then(() => res.status(200).json({ message: "Message modifié !" }))
          .catch((error) => res.status(402).json({ error }));
      } else {
        res.status(403).json({
          error: "Utilisateur non valide !",
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// route pour liker un message
exports.likeMessage = (req, res, next) => {
  const userPseudo = req.body.userPseudo;
  const like = req.body.likes;
  const modiflike = { likes: req.body.likes, updateAt: Date.now() };
  const messageId = req.params.id;
  Message.findOne({ where: { id: messageId } })
    .then((message) => {
      switch (like) {
        case 1:
          if (like == 1) {
            Message.update(modiflike, { where: { id: messageId } })
              .then(() => res.status(201).json({ message: "Message liké !" }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;
        case 0:
          if (like == 0) {
            Message.update(modiflike, { where: { id: messageId } })
              .then(() =>
                res.status(201).json({ message: "Message n'est plus liké !" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          break;
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
