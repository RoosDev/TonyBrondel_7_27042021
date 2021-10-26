// const fs = require("fs");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const dbConnect = require("../config/db.config");
const modelUsers = dbConnect.users;

//--------------------------------------------------------------------------------------------------

// // Mise en place des variables d'environnement
const dotenv = require("dotenv");
const { sequelize } = require("../config/db.config");
dotenv.config();
const MY_APP_SECRET = process.env.APP_SECRET_KEY;
const A2_ASSO_DATA_P = process.env.ARGON2_ASSOCIATEDDATA_password;
const CRYPT_PASS = process.env.Crypto_Passphrase;
const CRYPT_OutLen = process.env.Crypto_OutPutLength;

//--------------------------------------------------------------------------------------------------
// Ensemble des Controllers pour créer une donnée : POST

// POST pour un nouvel utilisateur
exports.signup = async (req, res, next) => {
  // lancement de la recherche de l'utilisateur avant création

  // const existOrNot = await modelUsers.findOne({
  //   attributes: {exclude: ["firstname", "lastname"] },
  //   include: [{ where: { email_H: email_visible } }],
  // });
  try {
    // Récupération des valeur utilisateur
    const email_visible = req.body.email;
    const password_visible = req.body.password;

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
    res.send(existOrNot);
    if (existOrNot != null) {
      // Si l'adresse email correspond déja à un compte utilisateur
      console.log(
        "Nouvelle tentative d'inscription avec l'email existant donc l'id est :> " +
          existOrNot.id
      );
      // return res.send({
      //   message:
      //     "Il semble que nous nous soyons déjà croisé. Avez vous oubliez ?",
      // });
    } else {
      ///-------------------------------------------------------/
      // Lancement de la création de l'utilisateur
      const theUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email_Crypt: email_Cryp,
        email_H: email_Hash,
        password_H: password_Hash,
        job: req.body.job,
        photo_URL: null,
        division: req.body.division,
        last_Connexion: req.body.last_Connexion,
        role_id: 1,
        active: false,
      };
      try {
        const data = await modelUsers.create(theUser);
        return res
          // .send({ data })
          .status(201)
          // .json({
          //   message: "Il y a un petit nouveau parmis nous, Bienvenue !",
          // })
          ;
      } catch (err) {
        return res
          .status(500)
          // .json({
          //   error:
          //     "Une erreur s'est produite, nous n'avons pas pus vous enregistrer.",
          //   details: err,
          // })
          ;
      }
    }
  } catch (err) {
    return res
      .status(500)
      // .json({
      //   error:
      //     "Une erreur s'est produite, veuillez réessayer dans quelques instants.",
      // })
    ;
  }
};

// // ----------------------------------------------------------------------/
// //       script pour le login
// // ----------------------------------------------------------------------/

exports.login = async (req, res, next) => {
  try {
    // Récupération des valeur utilisateur
    const email_login = req.body.email;
    const password_login = req.body.password;

    // //-----------------------------------------------------------------------------------------------//
    //                        TRAITEMENT EN AMONT DES DONNEES
    // //-----------------------------------------------------------------------------------------------//

    // hash de l email avec cryptoJS :
    const email_HashLogin = await CryptoJS.SHA3(email_login, {
      outputLength: CRYPT_OutLen,
    }).toString();

    // //-----------------------------------------------------------------------------------------------//

    // Recherche d'une entrée dans la base en fonction de l'email hashé
    const findForLogin = await modelUsers.findOne({
      where: { email_H: email_HashLogin },
    });
    res.send(findForLogin);

    if (findForLogin != null) {
      console.log("on check le pass");

      // Lancement de la vérification du mot de passe

      const checkPassword = await argon2.verify(
        findForLogin.password_H,
        password_login
      );
      if (checkPassword) {
        console.log("ok on est logggggééééé !!!!");
        const mytoken = await jwt.sign(
          {
            id: findForLogin.id,
            email: findForLogin.email_Hash,
            firstname: findForLogin.firstname,
            lastname: findForLogin.lastname,
          },
          MY_APP_SECRET,
          { expiresIn: "24h" },
          { algorithm: "RS256" }
        );
        console.log("my token => " + mytoken);

        return res.status(200).json({ token: mytoken });
      } else {
        console.log("erreur de mot de passe");
        return res.status(400).json({ error: "Mot de passe incorrect" });
      }
    } else {
      console.log("email inconnu.");
      return (res.sendStatus(500).statusMessage =
        "Nous n'arrivons pas à vous trouver. Etes vous inscrit ?");
    }
  } catch (err) {
    return (res.statusMessage =
      err.message ||
      "Une erreur s'est produite, veuillez réessayer dans quelques instants.");
  }
};
