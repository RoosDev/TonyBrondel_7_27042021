const express = require("express");
const router = express.Router()
const userCtrl = require("../controllers/user_control");
// const passValidation = require("../middleware/pass_Validation");

router.post('/signup', userCtrl.Signup);
router.post("/login", userCtrl.LoginQuery);

// // Liste des routes pour créer quelque chose :
//     // Création d'un utilisateur
//     router.post("/user",  multer, feedCtrl.createFeed);

// // Liste des routes pour modifier quelque chose :
//     // Modification d'un utilisateur
//     router.put("/user",  multer, feedCtrl.createFeed);

// // Liste des routes pour supprimer quelque chose :
//     // Suppression d'un utilisateur
//     router.delete("/user",  multer, feedCtrl.createFeed);

// Liste des routes pour obtenir quelque chose :
    // Liste de tous les utilisateurs
    // router.get("/user",  multer, feedCtrl.getUsers);
    // Détail d'un utilisateur
    // router.get("/user/:id",  multer, feedCtrl.getOneUser);



module.exports = router;
