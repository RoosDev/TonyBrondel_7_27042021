const express = require("express");
const router = express.Router();
const userSignLogCtrl = require("../controllers/userSignLog_control");
const passValidation = require("../middlewares/pass_Validation");
const multer = require("../middlewares/multer_config");

// // Liste des routes pour créer quelque chose :
    // Création d'un nouvel utilisateur 
    router.post("/signup",  multer, userSignLogCtrl.signup);
    
    //Connexion d'un utilisateur
    router.post("/login",  multer, userSignLogCtrl.login);

module.exports = router;
