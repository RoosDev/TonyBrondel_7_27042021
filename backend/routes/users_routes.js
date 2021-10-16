const router = require("express").Router();
const userSignLogCtrl = require("../controllers/userSignLog_control");
// const auth = require("../middleware/auth");
const multer = require("../middlewares/multer_config");

// // Liste des routes pour créer quelque chose :
    // Création d'un nouvel utilisateur 
    router.post("/signup",  multer, userSignLogCtrl.signup);

module.exports = router;
