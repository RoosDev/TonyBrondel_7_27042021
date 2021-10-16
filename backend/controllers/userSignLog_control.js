// const fs = require("fs");
const dbConnect = require("../config/db.config");
const modelUsers = dbConnect.users;
// const modelLikesType = dbConnect.likes_type;

// Ensemble des Controllers pour créer une donnée : POST

// POST pour un nouvel utilisateur
exports.signup = async (req, res, next) => {
  const theUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email_Crypt: req.body.email,
    email_H: req.body.email,
    password_H: req.body.password,
    job: req.body.job,
    photo_URL: req.body.photo_URL,
    division: req.body.division,
    last_Connexion: req.body.last_Connexion,
    role_id: 1,
    active: 1,
  };
  console.log(theUser);
  try {
    const data = await modelUsers.create(theUser);
    res.send( { data } );
  } catch (err) {
    res.sendStatus(500)
    res.statusMessage =  err.message || "Une erreur s'est produite. Veuillez réessayer."
  }
};

