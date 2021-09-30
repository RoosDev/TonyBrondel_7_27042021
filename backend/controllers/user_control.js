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

const email_Hash = argon2.hash(email_visible, {
  type: argon2.argon2id,
  timeCost: 20,
  hashLength: 128,
  associatedData: Buffer.from(A2_ASSO_DATA),
});

console.log(email_visible + ' => ' + email_Hash);

const email_Cryp = CryptoJS.AES.encrypt(email_visible, CRYPT_PASS);
console.log(email_visible + ' => ' + email_Cryp);


// hash du password avec argon2 : https://github.com/ranisalt/node-argon2/wiki/Options
exports.signup = (req, res, next) => {

  // // vérification si l'utilisateur existe déja
  // userList.find().then((usersList) => {
  //   let emailTable = [];
  //   usersList.forEach((element) => {
  //     emailTable.push(
  //       CryptoJS.AES.decrypt(element.email, CRYPT_PASS).toString(
  //         CryptoJS.enc.Utf8
  //       )
  //     );
  //   });
  //   if (emailTable.includes(newEmail) == true) {
  //     return res.status(401).json({ error: "Utilisateur déja enregistré ." });
  //   } else {
  //     // lancement de l'enregistrement
  //     const cryptEmail = CryptoJS.AES.encrypt(newEmail, CRYPT_PASS);
  //     argon2
  //       .hash(req.body.password, {
  //         type: argon2.argon2id,
  //         timeCost: 12,
  //         hashLength: 128,
  //         associatedData: Buffer.from(A2_ASSO_DATA),
  //       })
  //       .then((hash) => {
  //         const userList = new userList({
  //           email: cryptEmail,
  //           password: hash,
  //         });
  //         userList
  //           .save()
  //           .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
  //           .catch((error) => res.status(400).json({ error }));
  //       })
  //       .catch((error) => res.status(500).json({ error }));
  //   }
  // });
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
