const router = require("express").Router();
const feedCtrl = require("../controllers/feed_control");
// const auth = require("../middleware/auth");
const multer = require("../middlewares/multer_config");

// // Liste des routes pour créer quelque chose :
//     // Création d'un post dans le feed
//     router.post("/",  multer, feedCtrl.createFeed);
//     // Création d'un commentaire
//     router.post("/id",  multer, feedCtrl.createFeed);
//     // Création d'un like
//     router.post("/id/like",  multer, feedCtrl.createFeed);

// // Liste des routes pour modifier quelque chose :
//     // Modification d'un post dans le feed
//     router.put("/",  multer, feedCtrl.createFeed);
//     // Modification d'un like
//     router.put("/id/like",  multer, feedCtrl.createFeed);

// // Liste des routes pour supprimer quelque chose :
//     // Suppression d'un post dans le feed
//     router.delete("/",  multer, feedCtrl.createFeed);
//     // Suppression d'un like
//     router.delete("/id/like",  multer, feedCtrl.createFeed);

// Liste des routes pour obtenir quelque chose :
    // Liste de tous les post dans le feed
    router.get("/", multer, feedCtrl.getAllFeeds);
    // Détail d'un post dans le feed et Liste de tous les commentaires d'un post
    router.get("/:id/comment",  multer, feedCtrl.getAllComments);
    // Obtention des likes d'un post
    router.get("/:id/like",  multer, feedCtrl.getLikesPost);
    // Obtention de la liste des différents types de like
    router.get("/likes",  multer, feedCtrl.getLikes);
module.exports = router;
