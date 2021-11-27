const jwt = require("jsonwebtoken");
const dbConnect = require("../config/db.config");
const User = dbConnect.users;

// Mise en place des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
const MY_APP_SECRET = process.env.APP_SECRET_KEY;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  let tokenRole = req.headers["x-role-token"];
  if ( !token && !tokenRole ) {
    return res.status(403).send({
      message: "Pas de Token ... Pas d'accès",
    });
  }

  jwt.verify(token, MY_APP_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Accès non authorisé",
      });
    }
    req.email = decoded.email;
    next();
  });
  return req.email;
};

isAdmin = async (req, res, next) => {
  let tokenRole = req.headers["x-role-token"];
  console.log("req email in admin: ", req.email);
  jwt.verify(tokenRole, MY_APP_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Accès non authorisé",
      });
    }
    req.role = decoded.role;
    console.log("decoded role 1 >> " + decoded.role);
    next();
  });

  console.log("req email >> ", req.email);
  
  User.findOne({
    where: { email_Crypt: req.email },
  }).then((user) => {
    console.log("user req >>" ,user.role_Id)
    console.log("user req.user >>" ,req.role)
    if (user.role_Id === req.role == 3) {
      console.log('ça y est , on a les droits et pour pas cher en plus !')
      return ;
    } else {
      console.log('désolé , mais on passe son chemin !!')
      res.status(403);
    }
  });
};


isManager = (req, res, next) => {
  let tokenRole = req.headers["x-role-token"];
  console.log("req email in manager: ", req.email);
  jwt.verify(tokenRole, MY_APP_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Accès non authorisé",
      });
    }
    req.role = decoded.role;
    console.log("decoded role 1 >> " + decoded.role);
    next();
  });

  console.log("req email >> ", req.email);
  
  User.findOne({
    where: { email_Crypt: req.email },
  }).then((user) => {
    console.log("user req >>" ,user.role_Id)
    console.log("user req.user >>" ,req.role)
    if (user.role_Id === req.role >= 2) {
      console.log('ça y est , on a les droits et pour pas cher en plus !')
      return ;
    } else {
      console.log('désolé , mais on passe son chemin !!')
      res.status(403);
    }
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.id).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "manager") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Vous devez être manager ou admin.",
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isManager: isManager,
  isModeratorOrAdmin: isModeratorOrAdmin,
};
module.exports = authJwt;
