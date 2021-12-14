const dbConnect = require("../config/db.config");
const ROLES = dbConnect.ROLES;
const User = dbConnect.users;
const CryptoJS = require("crypto-js");

// // Mise en place des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
const CRYPT_OutLen = process.env.Crypto_OutPutLength;


checkDuplicateEmail = (req, res, next) => {

  const email_Hash = CryptoJS.SHA3(req.body.email, {
    outputLength: CRYPT_OutLen,
  }).toString();

    // Email
    User.findOne({
      where: {
        email_H: email_Hash
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Loupé, il semble que vous soyez déja inscrit."
        });
        return;
      }

      next();
    });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Erreur, ce rôle n'existe pas = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;