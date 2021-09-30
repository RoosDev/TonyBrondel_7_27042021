// Intégration des modules nécessaires
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

// Mise en place des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
const MY_APP_SECRET = process.env.APP_SECRET_KEY;
const A2_ASSO_DATA = process.env.ARGON2_ASSOCIATEDDATA;
const CRYPT_PASS = process.env.Crypto_Passphrase;



// variable de l'adresse email (élément principal des requêtes)
const email_visible = 'dev@difiworld.com' //req.body.email
const password_visible = 'dev@difiworld.com' //req.body.email

const email_Hash = argon2.hash(email_visible, {
  type: argon2.argon2id,
  timeCost: 20,
  hashLength: 128,
  associatedData: Buffer.from(A2_ASSO_DATA),
});

const password_Hash = argon2.hash(password_visible, {
  type: argon2.argon2id,
  timeCost: 20,
  hashLength: 128,
  associatedData: Buffer.from(A2_ASSO_DATA),
});


const email_Cryp = CryptoJS.AES.encrypt(email_visible, CRYPT_PASS);


// hash du password avec argon2 : https://github.com/ranisalt/node-argon2/wiki/Options
exports.signup = (req, res, next) => {

  // Liste des utilisateurs
  let newEmail = {email_H: email_Hash}
  let newUser  = {email_H: email_Hash, password_H: password_Hash};
  connexion.query('SELECT id FROM users_connect WHERE ?;',newEmail, function (err, res, fields) {
    if (err) throw err;
    res.query('INSERT INTO users_connect SET ?', newUser, function (err, res, fields) {
      if (err) throw err;
      // Neat!
    });
  });
  let newIdentity = {email_H: email_Hash, firstname:req.body.firstname, lastname:req.body.lastname,  email_Crypt:email_Cryp, job:req.body.job, photo_URL:req.body.photourl, division:req.body.division }
  connection.query('INSERT INTO users_identity SET ?', newIdentity, function (err, res, fields) {  })
};
exports.login = (req, res, next) => {
  // const currentEmail = email_visible;

  // userList.find()
  //   .then((usersList) => {
  //     let emailTable = [];
  //     usersList.forEach((element) => {
  //       emailTable.push(
  //         CryptoJS.AES.decrypt(element.email, CRYPT_PASS).toString(
  //           CryptoJS.enc.Utf8
  //         ),
  //         element.password
  //       );
  //     });
  //     if (emailTable.includes(currentEmail) == false) {
  //       return res.status(401).json({ error: "Utilisateur inconnu ." });
  //     } else {
  //       const emailIndex = emailTable.indexOf(currentEmail) / 2;
  //       argon2
  //         .verify(usersList[emailIndex].password, req.body.password)
  //         .then((valid) => {
  //           if (!valid) {
  //             return res.status(401).json({ error: "Mot de passe incorrect" });
  //           }
  //           res.status(200).json({
  //             userId: usersList[emailIndex]._id,
  //             token: jwt.sign(
  //               { userId: usersList[emailIndex]._id },
  //               MY_APP_SECRET,
  //               {
  //                 expiresIn: "2h",
  //               }
  //             ),
  //           });
  //         })
  //         .catch((error) => res.status(500).json({ error }));
  //     }
  //   })
  //   .catch((error) => res.status(500).json({ error }));
};
