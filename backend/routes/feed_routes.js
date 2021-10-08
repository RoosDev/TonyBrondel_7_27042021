const express = require("express");
const router = express.Router();

const feedCtrl = require("../controllers/feed_control");
// const auth = require("../middleware/auth");
const multer = require("../middlewares/multer_config");

// // Liste des routes pour créer quelque chose :
//     // Création d'un utilisateur
//     router.post("/user",  multer, feedCtrl.createFeed);
//     // Création d'un post dans le feed
//     router.post("/feed",  multer, feedCtrl.createFeed);
//     // Création d'un commentaire
//     router.post("/feed/id",  multer, feedCtrl.createFeed);
//     // Création d'un like
//     router.post("/feed/id/like",  multer, feedCtrl.createFeed);

// // Liste des routes pour modifier quelque chose :
//     // Modification d'un utilisateur
//     router.put("/user",  multer, feedCtrl.createFeed);
//     // Modification d'un post dans le feed
//     router.put("/feed",  multer, feedCtrl.createFeed);
//     // Modification d'un like
//     router.put("/feed/id/like",  multer, feedCtrl.createFeed);

// // Liste des routes pour supprimer quelque chose :
//     // Suppression d'un utilisateur
//     router.delete("/user",  multer, feedCtrl.createFeed);
//     // Suppression d'un post dans le feed
//     router.delete("/feed",  multer, feedCtrl.createFeed);
//     // Suppression d'un like
//     router.delete("/feed/id/like",  multer, feedCtrl.createFeed);

// Liste des routes pour obtenir quelque chose :
    // Liste de tous les utilisateurs
    // router.get("/user",  multer, feedCtrl.getUsers);
    // Détail d'un utilisateur
    // router.get("/user/:id",  multer, feedCtrl.getOneUser);
    // Liste de tous les post dans le feed
    router.get("/feed",  multer, feedCtrl.getAllFeeds);
    // Détail d'un post dans le feed et Liste de tous les commentaires d'un post
    router.get("/feed/id",  multer, feedCtrl.getOneFeed);
    // Obtention des likes d'un post
    // router.get("/feed/id/like",  multer, feedCtrl.createFeed);

module.exports = router;
