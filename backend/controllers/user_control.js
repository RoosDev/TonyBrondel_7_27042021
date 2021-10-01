// Intégration des modules nécessaires
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

// // Mise en place des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
const MY_APP_SECRET = process.env.APP_SECRET_KEY;
const A2_ASSO_DATA = process.env.ARGON2_ASSOCIATEDDATA;
const CRYPT_PASS = process.env.Crypto_Passphrase;

// variable de l'adresse email (élément principal des requêtes) => pour test !!!!!
const email_visible = "dev@difiworld.com"; //req.body.email
const password_visible = "dev@difiworld.com"; //req.body.email

// hash de l email avec argon2 : https://github.com/ranisalt/node-argon2/wiki/Options
const email_Hash = argon2.hash(email_visible, {
  type: argon2.argon2id,
  timeCost: 20,
  hashLength: 128,
  associatedData: Buffer.from(A2_ASSO_DATA),
});

// hash du password avec argon2 : https://github.com/ranisalt/node-argon2/wiki/Options
const password_Hash = argon2.hash(password_visible, {
  type: argon2.argon2id,
  timeCost: 20,
  hashLength: 128,
  associatedData: Buffer.from(A2_ASSO_DATA),
});


exports.signup = async (req, res, next) => {
  try {
    // cryptage de l email avec CryptoJS
    const email_Cryp = await CryptoJS.AES.encrypt(email_visible, CRYPT_PASS);

    // Mise en place des variables utiles
    let newEmail = { email_H: email_Hash };

    let currentUser = connection.query(
      "SELECT id FROM users_connect WHERE ?;",
      newEmail,
      // function (err, res, fields) {
      //   if (err) throw err;
      // }
    );

    //lancement de la vérification : nouvel utilisateur ou non ?
    if (currentUser > 0) {
      res
        .status(400)
        .json({
          message: "Désolé mais je pense que nous nous sommes déja vu.",
        });
    } else {

      // c'est bien un nouvel utilisateur, enregistrons le !
      let newIdentity = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email_Crypt: email_Cryp,
        email_H: email_Hash,
        password_H: password_Hash,
        job: req.body.job,
        photo_URL: req.body.photourl,
        division: req.body.division,
        role_id: role_id_select,
        active: activeornot,
      };
      connection.query(
        "INSERT INTO users_identity SET ?",
        newIdentity,
        function (err, res, fields) {
          res
          .status(201)
          .json({ message: "Il y a un nouveau venu parmit nous !! " });
  
        }
      );
      res
        .status(201)
        .json({ message: "Il y a un nouveau venu parmit nous !! " });
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "Le nouvel utilisateur n'a pu être enregistré.", err });
  }
};
// exports.login = (req, res, next) => {

//   //     if (emailTable.includes(email_visible) == false) {
//   //       return res.status(401).json({ error: "Utilisateur inconnu ." });
//   //     } else {
//   //       const emailIndex = emailTable.indexOf(currentEmail) / 2;
//   //       argon2
//   //         .verify(usersList[emailIndex].password, req.body.password)
//   //         .then((valid) => {
//   //           if (!valid) {
//   //             return res.status(401).json({ error: "Mot de passe incorrect" });
//   //           }
//   //           res.status(200).json({
//   //             userId: usersList[emailIndex]._id,
//   //             token: jwt.sign(
//   //               { userId: usersList[emailIndex]._id },
//   //               MY_APP_SECRET,
//   //               {
//   //                 expiresIn: "2h",
//   //               }
//   //             ),
//   //           });
//   //         })
//   //         .catch((error) => res.status(500).json({ error }));
//   //     }
//   //   })
//   //   .catch((error) => res.status(500).json({ error }));
// };
