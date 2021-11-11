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
    const password_Hash = await argon2.hash(password_visible);

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
    if (existOrNot != null) {
      // Si l'adresse email correspond déja à un compte utilisateur
      console.log(
        "Nouvelle tentative d'inscription avec l'email existant donc l'id est :> " +
          existOrNot.id
      );
      return res.send({
        message:
          "Il semble que nous nous soyons déjà croisé. Avez vous oubliez ?",
      });
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
        role_Id: 1,
        active: 1,
      };
      try {
        const data = await modelUsers.create(theUser);
        return res
          .send({ data })
          .status(201)
          .json({
            message: "Il y a un petit nouveau parmis nous, Bienvenue !",
          })
          ;
      } catch (err) {
        return res
          .status(500)
          .json({
            error:
              "Une erreur s'est produite, nous n'avons pas pus vous enregistrer.",
            details: err,
          })
          ;
      }
    }
  } catch (err) {
    return res
      .status(500)
      .json({
        error:
          "Erreur 500 : Une erreur s'est produite, veuillez réessayer dans quelques instants.",
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
      attributes: ['id', 'email_H', 'email_Crypt', 'password_H','role_Id'],
      // include: [
      //   { model: modelUserRole, as: 'userRole', attributes:['id', 'role_Name']},
      //  ],
      where: { email_H: email_HashLogin },
    })
    .then(async findForLogin => {
      if (findForLogin != null) {
        console.log("On vous a trouvé, on check le pass");
      } else {
        console.log("email inconnu.");
        return res.status(404).send({ 
          message: "Nous n'arrivons pas à vous trouver. Etes vous inscrit ?"});
      }
  
        // Lancement de la vérification du mot de passe
      console.log('password_H     >>> ' + findForLogin.password_H);
      console.log('passwordLogin >>> ' + passwordLogin);
      let checkPassword = await argon2.verify( 
        findForLogin.password_H,
        passwordLogin
      );  
      console.log('check pass : >>' ,  checkPassword);
      if ( checkPassword){

      // if ( (argon2.verify(findForLogin.password_H, req.body.password ))){
        console.log("ok on est logggggééééé !!!!");
        // Génération du token à envoyer
        let accessToken = jwt.sign(
          { email: findForLogin.email_Crypt, },
          MY_APP_SECRET,
          { expiresIn: "24h" },
          { algorithm: "RS256" }
        );
        console.log("my token => " + accessToken);

        // Récupératiion du niveau de role de l'utilisateur
        // let authorities = [];
        const roleId = findForLogin.role_Id;
          console.log('role ID >> ' + roleId);
          console.log('findForLogin >> ' + (findForLogin));
        // const roles = modelUsers.findAll({
        //   attributes: ['id', 'role_Id'],
        //   include: [
        //             { model: modelUserRole, as: 'userRole', attributes:['id', 'role_Name']},
        //            ],
        //   where: {role_Id: roleId}, 
        // })
        // .then(
          // console.log('roles >> ' + roles),
        // authorities.push("ROLE_" + roles.name.toUpperCase())
        // )
        
        // console.log("authorities : >> " + authorities);
        return res.status(200).send({
          id: findForLogin.id,
          email: findForLogin.email_Crypt,
          roles: findForLogin.role_Id,
          token: accessToken
        })
      }else {
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
