const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const likeCtrl = require("../controllers/like");


// route pour liker un commentaire
router.post("/likeCommentaire/", auth, likeCtrl.createLikeCommentaire);

// route pour liker un message
router.post("/likeMessage/", auth, likeCtrl.createLikeMessage);

// route pour afficher les likes commentaire
router.get("/likeCommentaire/", likeCtrl.getLikeCommentaire);

// route pour afficher les likes message
router.get("/likeMessage/", likeCtrl.getLikeMessage);

// route pour supprimer le like d'un commentaire
router.delete("/likeCommentaire/:id", auth, likeCtrl.deleteLikeCommentaire);

// route pour supprimer le like d'un message
router.delete("/likeMessage/:id", auth, likeCtrl.deleteLikeMessage);

// route pour modifier le nombre de commentaire
router.put("/likeCommentaire/", likeCtrl.modifNbrLikeCommentaire);

// route pour modifier le nombre de message
router.put("/likeMessage/" , likeCtrl.modifNbrLikeMessage);


module.exports = router;
