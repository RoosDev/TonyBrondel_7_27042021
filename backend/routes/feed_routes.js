const express = require('express');
const router = require("express").Router();
const feedGetCtrl = require("../controllers/feedGet_control");
const feedPostCtrl = require("../controllers/feedPost_control");
const feedUpdateCtrl = require("../controllers/feedUpdate_control");
const feedDropCtrl = require("../controllers/feedDrop_control");
// const auth = require("../middlewares/auth");
const { authJwt } = require("../middlewares");
const multer = require("../middlewares/multer_configPosts");

// // Liste des routes pour créer quelque chose :
    // Création d'un post dans le feed
    router.post("/", multer, feedPostCtrl.PostPost);
    // Création d'un commentaire
    router.post("/:id/comment", feedPostCtrl.PostComment);
    // Ajout d'un like à un post
    router.post("/:id/like", feedPostCtrl.PostLike);

// // Liste des routes pour modifier quelque chose :
//     Modification d'un post dans le feed
    router.put("/:id", multer, feedUpdateCtrl.UpdatePost);

// // Liste des routes pour supprimer quelque chose :
//     // Suppression d'un post dans le feed
    router.delete("/:id", feedDropCtrl.deleteOnePost);
//     // Suppression d'un like
    router.delete("/:id/like", feedDropCtrl.deleteOneLike);

// // Liste des routes pour obtenir quelque chose :
    // Liste de tous les post dans le feed
    router.get("/", feedGetCtrl.getAllFeeds);
    // router.get('/', async function(req, res, next) {
    //     try {
    //       res.send(await feedGetCtrl.getAllFeeds(req.query.page));
    //     } catch (err) {
    //       console.error(`Error while getting feedGetCtrl `, err.message);
    //       next(err);
    //     }
    //   });

    // Récupère le détail d'un seul post dans le feed
    router.get("/:id",  feedGetCtrl.getOneFeed);
    // Détail d'un post dans le feed et Liste de tous les commentaires d'un post
    router.get("/:id/comment",  feedGetCtrl.getAllComments);
    // Obtention des likes d'un post
    router.get("/:id/like", feedGetCtrl.getLikesPost);
    // Obtention du nombre de like
    router.get("/countlikes", feedGetCtrl.countLikesPost);
    // Obtention de la liste des différents types de like
    router.get("/likes",  feedGetCtrl.getLikes);

module.exports = router;
