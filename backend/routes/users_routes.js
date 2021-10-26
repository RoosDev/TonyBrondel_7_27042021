const express = require("express");
const router = express.Router();
const userSignLogCtrl = require("../controllers/userSignLog_control");
const userGetCtrl = require("../controllers/userGet_control.js");
const userUpdateCtrl = require("../controllers/userUpdate_control.js");
const userDropCtrl = require("../controllers/userDrop_control");
const passValidation = require("../middlewares/pass_Validation");
const multer = require("../middlewares/multer_configProfile");

// // Liste des routes pour créer quelque chose :

    // Création d'un nouvel utilisateur 
    router.post("/signup", passValidation, userSignLogCtrl.signup);
    
    // Connexion d'un utilisateur
    router.post("/login",  multer, userSignLogCtrl.login);

    // Liste de tous les utilisateurs
    router.get("/profiles", multer, userGetCtrl.getAllProfiles);

    // Données de profil d'un utilisateur
    router.get("/profiles/:id", multer, userGetCtrl.getOneProfile);
    
    // Modification d'un profil utilisateur
    router.put("/myprofile/:id", multer, userUpdateCtrl.UpdateProfil);

    // Modification du role de l'utilisateur
    router.put("/roleprofile/:id", multer, userUpdateCtrl.UpdateRole);

    // Supprression d'un utilisateur
    router.delete("/getout/:id",  multer, userDropCtrl.deleteOneUser);


module.exports = router;
