const dbConnect = require("../config/db.config");
const User = dbConnect.users;
const Role = dbConnect.role;

// // Mise en place des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
const MY_APP_SECRET = process.env.APP_SECRET_KEY;
const CRYPT_PASS = process.env.Crypto_Passphrase;
const CRYPT_OutLen = process.env.Crypto_OutPutLength;


const Op = dbConnect.Sequelize.Op;

const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");



exports.signup = (req, res) => {
  // Récupération des valeur utilisateur
  const email_visible = req.body.email;
  const password_visible = req.body.password;

  // //-----------------------------------------------------------------------------------------------//
  //                        TRAITEMENT EN AMONT DES DONNEES AFIN DE LES SECURISER
  // //-----------------------------------------------------------------------------------------------//

  // hash de l email avec CryptoJS :
  const email_Hash = CryptoJS.SHA3(email_visible, {
    outputLength: CRYPT_OutLen,
  }).toString();

  // hash du password avec argon2 :
  const password_Hash = argon2.hash(password_visible, {
    type: argon2.argon2id,
    timeCost: 36,
    hashLength: 256,
    associatedData: Buffer.from(A2_ASSO_DATA_P),
  });

  // cryptage de l email avec CryptoJS
  const email_Cryp = CryptoJS.AES.encrypt(
    email_visible,
    CRYPT_PASS
  ).toString();
  // //-----------------------------------------------------------------------------------------------//
  
  // Enregistrement en base de donnée
  User.create({
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
    active: 1
})
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "Utilisateur enregistré avec succès." });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.login = (req, res) => {

    // Récupération des valeur utilisateur
    const email_login = req.body.email;
    const password_login = req.body.password;


    // //-----------------------------------------------------------------------------------------------//
    //                        TRAITEMENT EN AMONT DES DONNEES
    // //-----------------------------------------------------------------------------------------------//

    // hash de l email avec cryptoJS :
    const email_HashLogin = CryptoJS.SHA3(email_login, {
      outputLength: CRYPT_OutLen,
    }).toString();

    // //-----------------------------------------------------------------------------------------------//


  User.findOne({
    where: {
      email_H: email_HashLogin
    }
  })
    .then(user => {
      if (!user) {
        console.log('email mauvais');
        return res.status(404).send({ message: "Utilisateur inconnu." });
      }

      var passwordIsValid = argon2.verify(
        findForLogin.password_H,
        password_login
      );  
        console.log('email trouvé : ok ');

      if (!passwordIsValid) {
        console.log('password faux');
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      console.log("pass : >> " + passwordIsValid);
      console.log("Password OK ");
      var token = jwt.sign({ id: user.id }, MY_APP_SECRET, {
        expiresIn: 86400 // 24 hours
      });
      console.log('my token >>' + token);
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        console.log('authorities >>> ' + authorities);
        res.status(200).send({
          id: user.id,
          email: user.email_H,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};