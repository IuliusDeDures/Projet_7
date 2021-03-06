const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const commentaireCtrl = require("../controllers/commentaire");

// route pour l'affichage de l'ensemble des commentaires
router.get("/", commentaireCtrl.getAllCommentaire);

// route pour la création d'un commentaire
router.post("/",auth, commentaireCtrl.createCommentaire);

// route pour la suppression d'un commentaire
router.delete("/:id", auth, commentaireCtrl.deleteCommentaire);

// route pour l'affichage d'un commentaire
router.get("/:id", commentaireCtrl.getOneCommentaire);

// route pour modifier le nombre de commentaires
router.put("/",commentaireCtrl.modifNbrCommentaire);

// route pour la suppression d'un commentaire pour l'administrateur
router.delete("/admin/:id", auth, commentaireCtrl.deleteCommentaireAdmin);

module.exports = router;