const express = require("express");
const router = express.Router();
const pseudo = require("../middleware/pseudo-validator");
const password = require("../middleware/password-validator");
const email = require("../middleware/email-validator");
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

// route pour l'inscription d'un nouvel utilisateur
router.post("/signup", pseudo, password, email, userCtrl.signup);

// route pour la connection d'un utilisateur
router.post("/login", userCtrl.login);

// route pour supprimer un utilisateur (compte utilisateur)
router.delete("/:email", auth, userCtrl.deleteUser);

// route pour supprimer un utilisateur (compte administrateur)
router.delete("/deleteOne/:pseudo", userCtrl.deleteOneUser);

// route pour afficher les utilisateurs
router.get("/users", userCtrl.getAllUsers)

module.exports = router;
