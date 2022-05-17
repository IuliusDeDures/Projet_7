const bcrypt = require("bcrypt");

const User = require("../models/users");

const jwt = require("jsonwebtoken");

// route pour l'inscription d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        pseudo: req.body.pseudo,
        password: hash,
        isAdmin: req.body.isAdmin,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) =>
          res.status(400).json({ error: "Utilisateur déja créé" })
        );
    })
    .catch((error) => res.status(500).json({ error }));
};

// route pour la connexion d'un utilisateur dejà inscrit
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            message: "Bonjour " + user.pseudo,
            userPseudo: user.pseudo,
            token: jwt.sign({ userPseudo: user.pseudo }, "RANDOM_TOKEN_SECRET"),
            isAdmin: user.isAdmin,
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(501).json({ error }));
};

// route pour supprimer un utilisateur (compte utilisateur)
exports.deleteUser = (req, res, next) => {
  const email = req.params.email;  
  User.findOne({ where: { email: email } })

  .then((user) => {      
      if (user.pseudo == req.auth.userPseudo) {
      User.destroy({ where: { email: email } })
          .then(() =>
            res
            .status(200)
            .json({ message: "Utilisateur " + user.pseudo + " supprimé !" })
            )
          .catch((error) => res.status(403).json({ error }));   
    }else{
      res.status(401).json({
        error: "Utilisateur non valide",
      });      
    }     
  })
    .catch((error) => res.status(501).json({ error }));
};

// route pour supprimer un utilisateur (compte administrateur)
exports.deleteOneUser = (req, res, next) => {
  const pseudo = req.params.pseudo;  
  User.findOne({ where: { pseudo: pseudo } })

  .then((user) => {      
      User.destroy({ where: { pseudo: pseudo } })
          .then(() =>
            res
            .status(200)
            .json({ message: "Utilisateur " + user.pseudo + " supprimé !" })
            )
          .catch((error) => res.status(403).json({ error }));     
      })      
    .catch((error) => res.status(501).json({ error }));
};

// route pour afficher l'ensemble des utilisateurs
exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
