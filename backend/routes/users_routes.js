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
    
    // Données de profil d'un utilisateur
    router.get("/profile/:id", [authJwt.verifyToken], userGetCtrl.getOneProfile);
    // Liste de tous les utilisateurs
    router.get("/profiles", [authJwt.verifyToken], userGetCtrl.getAllProfiles);


// Autorisé pour l utilisateur lui meme
    // Modification du profil utilisateur
    router.put("/myProfile/:id", [authJwt.verifyToken, authJwt.isProfileOwner], userUpdateCtrl.UpdateProfil);

    // Modification de la photo utilisateur
    router.put("/upload/profile/", [authJwt.verifyToken, authJwt.isProfileOwner], multer.single("file"), userUploadImgCtrl.uploadFiles);

    // Modification d un mot de passe utilisateur
    router.put("/myProfile/pass/:id", [authJwt.verifyToken, authJwt.isProfileOwner], userUpdateCtrl.UpdatePassword);
    
    // // Suppression de son propre profil
    router.put("/myProfile/getout/:id", [authJwt.verifyToken, authJwt.isProfileOwner], userUpdateCtrl.getOutProfil);


// Autorisé pour les managers

    // Modification d'un role utilisateur
    router.put("/Admin/profile/role/:id", [authJwt.verifyToken, (authJwt.isManager || authJwt.isAdmin)], userUpdateCtrl.updateRole);



// Autorisé pour les administrateurs

    // // Suppression d'un utilisateur Admin
    router.put("/Admin/profile/getouts/:id", [authJwt.verifyToken, authJwt.isAdmin], userUpdateCtrl.getOutProfilAdmin);

module.exports = router;
