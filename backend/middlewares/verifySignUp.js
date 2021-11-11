const dbConnect = require("../config/db.config");
const ROLES = dbConnect.ROLES;
const User = dbConnect.users;
const CryptoJS = require("crypto-js");


checkDuplicateEmail = (req, res, next) => {

  const email_Cryp = CryptoJS.AES.encrypt(
    req.body.email,
    CRYPT_PASS
  ).toString();

    // Email
    User.findOne({
      where: {
        email_Crypt: email_Cryp
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