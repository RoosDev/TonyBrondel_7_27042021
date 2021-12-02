const express = require("express");
const router = express.Router();
const userSignLogCtrl = require("../controllers/userSignLog_control");
// const userRoleCtrl = require("../controllers/userRoles_control")
const userGetCtrl = require("../controllers/userGet_control.js");
const userUpdateCtrl = require("../controllers/userUpdate_control.js");
const userUploadImgCtrl = require("../controllers/UserUpload_control");
const userDropCtrl = require("../controllers/userDrop_control");
const passValidation = require("../middlewares/pass_Validation");
const multer = require("../middlewares/multer_configProfile");
const { manager, verifySignUp, authJwt } = require("../middlewares");

// // Liste des routes pour créer quelque chose :

    // Création d'un nouvel utilisateur 
    // router.post("/signup", passValidation, userSignLogCtrl.signup);
      router.post("/signup",
      [
        verifySignUp.checkDuplicateEmail,
        verifySignUp.checkRolesExisted
      ], 
      passValidation, userSignLogCtrl.signup);
    

// Autorisé pour tous
    // Connexion d'un utilisateur
    router.post("/login", userSignLogCtrl.login);


// Autorisé pour l utilisateur lui meme
    // Modification d'un profil utilisateur
    router.put("/profile/:id", [authJwt.verifyToken], userUpdateCtrl.UpdateProfil);

    // Modification de la photo utilisateur
    router.put("/upload/profile/", [authJwt.verifyToken], multer.single("file"), userUploadImgCtrl.uploadFiles);

    // Modification d un mot de passe utilisateur
    router.put("/myprofile/pass/:id", [authJwt.verifyToken], userUpdateCtrl.UpdatePassword);

    // Données de profil d'un utilisateur
    router.get("/profile/:id",  [authJwt.verifyToken], userGetCtrl.getOneProfile);
    
    // // Suppression de son propre profil
    router.put("/profile/getout/:id", [authJwt.verifyToken], userUpdateCtrl.getOutProfil);


// Autorisé pour les managers

    // Modification d'un role utilisateur
    router.put("/profile/role/:id", [authJwt.verifyToken, authJwt.isManager], userUpdateCtrl.updateRole);

    // Liste de tous les utilisateurs
    router.get("/profile", [authJwt.verifyToken, authJwt.isManager], userGetCtrl.getAllProfiles);


// Autorisé pour les administrateurs

    // // Suppression d'un utilisateur Admin
    router.put("/profile/getouts/:id", [authJwt.verifyToken, authJwt.isAdmin], userUpdateCtrl.getOutProfilAdmin);

module.exports = router;
