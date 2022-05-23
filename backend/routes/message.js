const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const messageCtrl = require("../controllers/message");

// route pour l'affichage de l'ensemble des messages
router.get("/", messageCtrl.getAllMessage);

// route pour la création d'un message
router.post("/", auth, multer, messageCtrl.createMessage);

// route pour la suppression d'un message
router.delete("/:id", auth, messageCtrl.deleteMessage);

// route pour l'affichage d'un message
router.get("/:id", messageCtrl.getOneMessage);

// route pour la suppression d'un message pour l'administrateur
router.delete("/admin/:id", auth, messageCtrl.deleteMessageAdmin);


module.exports = router;
