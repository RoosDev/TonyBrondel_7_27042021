const express = require("express");
const router = express.Router();
const userSignLogCtrl = require("../controllers/userSignLog_control");
// const userRoleCtrl = require("../controllers/userRoles_control")
const userGetCtrl = require("../controllers/userGet_control.js");
const userUpdateCtrl = require("../controllers/userUpdate_control.js");
const userDropCtrl = require("../controllers/userDrop_control");
const passValidation = require("../middlewares/pass_Validation");
const multer = require("../middlewares/multer_configProfile");
const { authJwt, verifySignUp } = require("../middlewares");

// // Liste des routes pour créer quelque chose :

    // Création d'un nouvel utilisateur 
    // router.post("/signup", passValidation, userSignLogCtrl.signup);
      router.post("/signup",
      [
        verifySignUp.checkDuplicateEmail,
        verifySignUp.checkRolesExisted
      ], 
      passValidation, userSignLogCtrl.signup);
    
    // Connexion d'un utilisateur
    router.post("/login", userSignLogCtrl.login);

    // Modification d'un profil utilisateur
    router.put("/profile/:id", [authJwt.verifyToken], userUpdateCtrl.UpdateProfil);

    // Liste de tous les utilisateurs
    router.get("/profile", [authJwt.verifyToken], userGetCtrl.getAllProfiles);

    // Données de profil d'un utilisateur
    router.get("/profile/:id",  [authJwt.verifyToken], userGetCtrl.getOneProfile);
    
    // // Modification du role de l'utilisateur
    // router.put("/roleprofile/:id", [authJwt.verifyToken, authJwt.isManager], userUpdateCtrl.UpdateRole);

    // // Suppression d'un utilisateur
    // router.delete("/getout/:id", [authJwt.verifyToken, authJwt.isAdmin], [authJwt.verifyToken], userDropCtrl.deleteOneUser);


module.exports = router;
