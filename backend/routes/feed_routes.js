const express = require("express");
const router = express.Router();

const feedCtrl = require("../controllers/feed_control");
// const auth = require("../middleware/auth");
const multer = require("../middleware/multer_config");

// Ajout d'un post dans la DB
router.post("", auth, multer, feedCtrl.createSauce);

// pour la modification d'un post
router.put("/:id", auth, multer, feedCtrl.modifySauce);

// pour la suppression d'une post
router.delete("/:id", auth, feedCtrl.deleteSauce);

// Affiche un seule post
router.get("/:id", auth, feedCtrl.getOneSauce);

// Affiche toutes les posts
router.get("", auth, feedCtrl.getAllSauces);

// Ajoute un Like ou dislike
router.post("/:id/like", auth, feedCtrl.addAVote);

module.exports = router;
