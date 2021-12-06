const express = require("express");
const router = require("express").Router();
const feedGetCtrl = require("../controllers/feedGet_control");
const feedPostCtrl = require("../controllers/feedPost_control");
const feedUpdateCtrl = require("../controllers/feedUpdate_control");
const feedDropCtrl = require("../controllers/feedDrop_control");
const feedUploadCtrl = require("../controllers/feedUpload_control");
const feedUploadGetCtrl = require("../controllers/feedUploadGet_Control");
const { authJwt } = require("../middlewares");
const multer = require("../middlewares/multer_configPosts");

// // Liste des routes pour créer quelque chose :

// Autorisé pour tous les utilisateurs
    // Création d'un post dans le feed
    router.post("/", [authJwt.verifyToken], feedPostCtrl.PostPost);
    // Liste des uploade de post :
    router.post("/upload/post", [authJwt.verifyToken], multer.single("file"), feedUploadCtrl.uploadFiles);
    // Création d'un commentaire
    router.post("/:id/comment", [authJwt.verifyToken], feedPostCtrl.PostComment);
    // Ajout d'un like à un post
    // router.post("/:id/like", [authJwt.verifyToken], feedPostCtrl.PostLike);

    // Liste de tous les post dans le feed
    router.get("/", [authJwt.verifyToken], feedGetCtrl.getAllFeeds);
    // Récupère le détail d'un seul post dans le feed
    router.get("/:id", [authJwt.verifyToken], feedGetCtrl.getOneFeed);
    // Liste de tous les commentaires d'un post
    router.get("/:id/comment", [authJwt.verifyToken], feedGetCtrl.getAllComments);
    // Obtention des likes d'un post
    // router.get("/:id/like", [authJwt.verifyToken], feedGetCtrl.getLikesPost);
    // Obtention du nombre de like
    // router.get("/countlikes", [authJwt.verifyToken], feedGetCtrl.countLikesPost);
    // Obtention de la liste des différents types de like
    // router.get("/likes", [authJwt.verifyToken], feedGetCtrl.getLikes);
    // Obtention de la liste des images de posts
    router.get("/upload/post", feedUploadGetCtrl.getHome);

// Autorisé pour l utilisateur lui meme
    //     Modification d'un post dans le feed
    router.put("/:id", [authJwt.verifyToken, (authJwt.isRessourceOwner || authJwt.isAdmin)], feedUpdateCtrl.UpdatePost);


// Autorisé pour l utilisateur lui meme et les administrateurs


    // // Liste des routes pour supprimer quelque chose :
    //     // Suppression d'un post dans le feed
    router.delete("/:id", [authJwt.verifyToken,(authJwt.isRessourceOwner || authJwt.isAdmin)], feedDropCtrl.deleteOnePost);
    //     // Suppression d'un like
    // router.delete("/:id/like",  [authJwt.verifyToken, authJwt.isRessourceOwner, authJwt.isAdmin], feedDropCtrl.deleteOneLike);



module.exports = router;
