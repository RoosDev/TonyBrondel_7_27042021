const jwt = require("jsonwebtoken");
const dbConnect = require("../config/db.config");
const User = dbConnect.users;

// Mise en place des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
const MY_APP_SECRET = process.env.APP_SECRET_KEY;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, MY_APP_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Accès non authorisé"
      });
    }
    req.email = decoded.email;
    console.log('userId >> ' + req.userId);
    console.log('decoded id >> ' + decoded.id);
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.id).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Vous n'êtes pas administrateur."
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.id).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "manager") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Vous n'êtes pas manager."
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.id).then(user => {
    user.getRoles().then(roles => {
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
        message: "Vous devez être manager ou admin."
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;