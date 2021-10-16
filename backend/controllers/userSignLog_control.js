// const fs = require("fs");
const argon2 = require("argon2");
// const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const dbConnect = require("../config/db.config");
const modelUsers = dbConnect.users;
// const modelLikesType = dbConnect.likes_type;

//--------------------------------------------------------------------------------------------------

// // Mise en place des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
const MY_APP_SECRET = process.env.APP_SECRET_KEY;
const A2_ASSO_DATA_E = process.env.ARGON2_ASSOCIATEDDATA_email;
const A2_ASSO_DATA_P = process.env.ARGON2_ASSOCIATEDDATA_password;
const CRYPT_PASS = process.env.Crypto_Passphrase;

//--------------------------------------------------------------------------------------------------
// Ensemble des Controllers pour créer une donnée : POST

// POST pour un nouvel utilisateur
exports.signup = async (req, res, next) => {

  // lanement de la recherche de l'utilisateur avant création

  // const existOrNot = await modelUsers.findOne({
  //   attributes: ["id"],
  //   include: [{ where: { email_H: email_visible } }],
  // });
try{
  // Récupération des valeur utilisateur
  const email_visible = req.body.email;
  const password_visible = req.body.password;
  
  // //-----------------------------------------------------------------------------------------------//
  //                        TRAITEMENT EN AMONT DES DONNEES AFIN DE LES SECURISER
  // //-----------------------------------------------------------------------------------------------//

                    // hash de l email avec argon2 : 
                    const email_Hash = CryptoJS.SHA3("email_visible", { outputLength: 256 }).toString();

                    // hash du password avec argon2 : 
                    const password_Hash = await argon2.hash(password_visible, {
                      type: argon2.argon2id,
                      timeCost: 36,
                      hashLength: 196,
                      associatedData: Buffer.from(A2_ASSO_DATA_P),
                    });

                    // cryptage de l email avec CryptoJS
                    const email_Cryp = await CryptoJS.AES.encrypt(email_visible, CRYPT_PASS).toString();

  // //-----------------------------------------------------------------------------------------------//
  const existOrNot = await modelUsers.findOne( {where: {email_H: email_Hash },})
  res.send(  existOrNot  )
  if( existOrNot != null ){
    console.log("Nouvelle tentative d'inscription avec l'email existant donc l'id est :> " +(existOrNot.id));
    res.statusMessage = "Il semble que nous nous soyons déjà croisé. Avez vous oubliez ?"
    return;
  }else{
          ///-------------------------------------------------------/
  // Lancement de la création de l'utilisateur
    const theUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email_Crypt: email_Cryp,
      email_H: email_Hash,
      password_H: password_Hash,
      job: req.body.job,
      photo_URL: req.body.photo_URL,
      division: req.body.division,
      last_Connexion: req.body.last_Connexion,
      role_id: 1,
      active: 1,
    };
    try {
      const data = modelUsers.create(theUser);
      res .send( { data } )
          .sendStatus(201).json({"Utilisateur créé." :any })
          res.statusMessage =  "Il y a un petite nouveau parmis nous, Bienvenue !"

      return;
    } catch (err) {
      res.sendStatus(500).json({"Erreur lors de l'inscription." :any})
      res.statusMessage =  err.message || "Une erreur s'est produite, nous n'avons pas pus vous enregistrer."
      return ;

    }
  }
} catch (err) {
  res.statusMessage =  err.message || "Une erreur s'est produite, veuillez réessayer dans quelques instants."
  return ;
}

};

