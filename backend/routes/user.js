const express = require("express");
const router = express.Router();
const pseudo = require("../middleware/pseudo-validator");
const password = require("../middleware/password-validator");
const userCtrl = require("../controllers/user");

// route pour l'inscription d'un nouvel utilisateur
router.post("/signup", pseudo, password, userCtrl.signup);

// route pour la connection d'un utilisateur
router.post("/login", userCtrl.login);

// route pour supprimer un utilisateur
router.delete("/:email", userCtrl.deleteUser);

// route pour afficher les utilisateurs
router.get("/users", userCtrl.getAllUsers)

module.exports = router;
