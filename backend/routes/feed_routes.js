const router = require("express").Router();
const feedGetCtrl = require("../controllers/feedGet_control");
const feedPostCtrl = require("../controllers/feedPost_control");
// const auth = require("../middleware/auth");
const multer = require("../middlewares/multer_config");

// // Liste des routes pour créer quelque chose :
//     // Création d'un post dans le feed
    router.post("/",  multer, feedPostCtrl.PostPost);
//     // Création d'un commentaire
    router.post("/:id/comment",  multer, feedPostCtrl.PostComment);
//     // Ajout d'un like à un post
    router.post("/:id/like",  multer, feedPostCtrl.PostLike);

// // Liste des routes pour modifier quelque chose :
//     // Modification d'un post dans le feed
//     router.put("/",  multer, feedGetCtrl.createFeed);
//     // Modification d'un like
//     router.put("/id/like",  multer, feedGetCtrl.createFeed);

// // Liste des routes pour supprimer quelque chose :
//     // Suppression d'un post dans le feed
//     router.delete("/",  multer, feedGetCtrl.createFeed);
//     // Suppression d'un like
//     router.delete("/id/like",  multer, feedGetCtrl.createFeed);

// Liste des routes pour obtenir quelque chose :
    // Liste de tous les post dans le feed
    router.get("/", multer, feedGetCtrl.getAllFeeds);
    // Détail d'un post dans le feed et Liste de tous les commentaires d'un post
    router.get("/:id/comment",  multer, feedGetCtrl.getAllComments);
    // Obtention des likes d'un post
    router.get("/:id/like",  multer, feedGetCtrl.getLikesPost);
    // Obtention de la liste des différents types de like
    router.get("/likes",  multer, feedGetCtrl.getLikes);

module.exports = router;
