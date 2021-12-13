// const fs = require("fs");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const dbConnect = require("../config/db.config");
const modelUsers = dbConnect.users;
const modelUserRole = dbConnect.role;

//--------------------------------------------------------------------------------------------------

// // Mise en place des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
const MY_APP_SECRET = process.env.APP_SECRET_KEY;
const A2_ASSO_DATA_P = process.env.ARGON2_ASSOCIATEDDATA_password;
const CRYPT_PASS = process.env.Crypto_Passphrase;
const CRYPT_OutLen = process.env.Crypto_OutPutLength;

//--------------------------------------------------------------------------------------------------
// Ensemble des Controllers pour créer une donnée : POST

// POST pour un nouvel utilisateur
exports.signup = async (req, res, next) => {

  try {
    // Récupération des valeur utilisateur
    const email_visible = req.body.email;
    const password_visible = req.body.password;
    console.log("C est parti on lance l enregistrement en base");
    // //-----------------------------------------------------------------------------------------------//
    //                        TRAITEMENT EN AMONT DES DONNEES AFIN DE LES SECURISER
    // //-----------------------------------------------------------------------------------------------//

    // hash de l email avec CryptoJS :
    const email_Hash = await CryptoJS.SHA3(email_visible, {
      outputLength: CRYPT_OutLen,
    }).toString();

    // hash du password avec argon2 :
    const password_Hash = await argon2.hash(password_visible, {
      type: argon2.argon2id,
      timeCost: 36,
        hashLength: 256,
        associatedData: Buffer.from(A2_ASSO_DATA_P),
      });

    // cryptage de l email avec CryptoJS
    const email_Cryp = await CryptoJS.AES.encrypt(
      email_visible,
      CRYPT_PASS
    ).toString();
    // //-----------------------------------------------------------------------------------------------//

    // Vérification de l 'existance de cet email dans la base de donnée utilisateurs

    const existOrNot = await modelUsers.findOne({
      where: { email_H: email_Hash },
    });
    // res.send(existOrNot);
    console.log('recherche de l existance de l email ...')
    if (existOrNot != null) {
      return res.status(409).send({
        message:
          "Il semble que nous nous soyons déjà croisé. Avez vous oublié ?",
      })
    } else {
      console.log('Cet email n existe pas, lancement de l inscription ...')
      ///-------------------------------------------------------/
      /// Lancement de la création de l'utilisateur
      ///-------------------------------------------------------/
      const theUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email_Crypt: email_Cryp,
        email_H: email_Hash,
        password_H: password_Hash,
        job: req.body.job,
        photo_URL: null,
        division: req.body.division,
        last_Connexion: Date.now(),
        role_Id: 1,
        active: 1,
      };
      try {
        const data = await modelUsers.create(theUser);
        return res
          .send({ data })
          .status(201);
      } catch (err) {
        return res
          .status(500)
          .send({
            message:
              "Une erreur s'est produite, nous n'avons pas pu vous enregistrer.",
            details: err,
          })
          ;
      }
    }
  } catch (err) {
    return res
      .status(500)
      .send({
        message:
          "Une erreur s'est produite, veuillez réessayer dans quelques instants.",
      })
    ;
  }
};

// // ----------------------------------------------------------------------/
// //       script pour le login
// // ----------------------------------------------------------------------/

exports.login = async (req, res, next) => {
  try {
    // Récupération des valeur utilisateur
    const emailLogin = req.body.email;
    const passwordLogin = req.body.password;

    // //-----------------------------------------------------------------------------------------------//
    //                        TRAITEMENT EN AMONT DES DONNEES
    // //-----------------------------------------------------------------------------------------------//

    // hash de l email avec cryptoJS :
    const email_HashLogin = await CryptoJS.SHA3(emailLogin, {
      outputLength: CRYPT_OutLen,
    }).toString();

    // //-----------------------------------------------------------------------------------------------//

    // Recherche d'une entrée dans la base en fonction de l'email hashé
    const findForLogin = await modelUsers.findOne({
      where: { email_H: email_HashLogin },
    })
    .then(async findForLogin => {
      if (findForLogin != null) {
        console.log("On vous a trouvé, on check le pass");
      } else {
        console.log("email inconnu.");
        return res.status(401).send({
          accessToken: null,
          message: "Nous n'arrivons pas à vous trouver. Etes vous inscrit ?" });
      }
      if(findForLogin.active != 0){
        console.log("Le compte est actif");
      } else {
        console.log("Compte inactif.");
        return res.status(401).send({ 
          message: "Ce compte a été supprimé. Vous devez vous réinscrire."});
      }
        // Lancement de la vérification du mot de passe
      let checkPassword = await argon2.verify( 
        findForLogin.password_H,
        passwordLogin
      );  
      if ( checkPassword){

      // if ( (argon2.verify(findForLogin.password_H, req.body.password ))){
        console.log("ok on est logggggééééé !!!!");
        // Génération du token à envoyer
        const accessToken = jwt.sign(
          { email: findForLogin.email_Crypt, },
          MY_APP_SECRET,
          { expiresIn: "24h" },
          { algorithm: "RS256" }
        );
        const RoleToken = jwt.sign(
          { email: findForLogin.role_Id, },
          MY_APP_SECRET,
          { expiresIn: "24h" },
          { algorithm: "RS256" }
        );
        const adminGo = () => {
          if(findForLogin.role_Id == 3){
            return 'okAGo';
          }else if(findForLogin.role_Id == 2){
            return 'okMGo';
          }else{
            return 'okU'
          }
        }

        return res.status(200).send({
          id: findForLogin.id,
          accessToken: accessToken, 
          roleToken: RoleToken, 
          canOrNot: adminGo(),
        }).message('Bienvenue !');
      } else {
        console.log("erreur de mot de passe");
        return res.status(401).send({
          accessToken: null,
          message: "Mot de passe incorrect" });
      } 

    })    
  } catch (err) {
    return (res.statusMessage =
      err.message ||
      "Une erreur s'est produite, veuillez réessayer dans quelques instants.");
  }
};
