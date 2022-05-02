const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const repCommentaireCtrl = require("../controllers/repCommentaire");

// route pour l'affichage de l'ensemble des réponse de commentaires
router.get("/", repCommentaireCtrl.getAllRepCommentaire);

// route pour la création d'une réponse de commentaire
router.post("/",auth, repCommentaireCtrl.createRepCommentaire);

// route pour la suppression d'une réponse de commentaire
router.delete("/:id", auth, repCommentaireCtrl.deleteRepCommentaire);

// route pour l'affichage d'une réponse de commentaire
router.get("/:id", repCommentaireCtrl.getOneRepCommentaire);

// route pour modifier le nombre de réponses de commentaires
router.put("/",repCommentaireCtrl.modifNbrRepCommentaire);

module.exports = router;