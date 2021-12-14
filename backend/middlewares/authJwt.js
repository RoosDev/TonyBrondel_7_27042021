const jwt = require("jsonwebtoken");
const dbConnect = require("../config/db.config");
const User = dbConnect.users;
const modelPostCommentList = dbConnect.post_comment_list;

// Enum

const roleEnum = {
  USER: 1,
  MANAGER: 2,
  ADMIN: 3,
};

// Mise en place des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
const MY_APP_SECRET = process.env.APP_SECRET_KEY;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  let tokenRole = req.headers["x-role-token"];
  if (!token && !tokenRole) {
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
};

isProfileOwner = async (req, res, next) => {
  User.findByPk(req.headers.id).then((theProfile) => {
    User.findOne({
      where: { email_H: req.email },
    }).then((theUserProfile) => {
      if (theUserProfile.id == theProfile.id) {
        res.status(200);
        next();
        return theUserProfile;
      } else {
        res.status(403).send({
          message: "Uniquement pour l auteur",
        });
        next();
      }
    });
  });
};

isProfileOwnerOrAdmin = async (req, res, next) => {
  User.findByPk(req.headers.id).then((theProfile) => {
    User.findOne({
      where: { email_H: req.email },
    }).then((theUserProfile) => {
      let tokenRole = req.headers["x-role-token"];
      jwt.verify(tokenRole, MY_APP_SECRET, (err, decod) => {});
      User.findOne({
        where: { email_H: req.email },
      }).then((user) => {
        req.userId = user.id;
        req.role = user.role_Id;
        if (theUserProfile.id == theProfile.id) {
          res.status(200);
          next();
          return theUserProfile;
        } else {
          res.status(403).send({
            message: "Uniquement pour l auteur",
          });
          next();
        }
      });
    });
  });
};

isRessourceOwner = async (req, res, next) => {
  modelPostCommentList.findByPk(req.params.id).then((thePost) => {
    User.findOne({
      where: { email_H: req.email },
    }).then((theUserAuthor) => {
      if (theUserAuthor.id == thePost.identity_Id) {
        res.status(200);
        next();
        return theUserAuthor.role_Id;
      } else {
        res.status(403).send({
          message: "Require Admin Role!",
        });
        next();
      }
    });
  });
};

isRessourceOwnerOrAdmin = async (req, res, next) => {
  modelPostCommentList.findByPk(req.params.id).then((thePost) => {
    User.findOne({
      where: { email_H: req.email },
    }).then((theUserAuthor) => {
      let tokenRole = req.headers["x-role-token"];
      jwt.verify(tokenRole, MY_APP_SECRET, (err, decod) => {});
      User.findOne({
        where: { email_H: req.email },
      }).then((user) => {
        req.userId = user.id;
        req.role = user.role_Id;
      if (theUserAuthor.id == thePost.identity_Id || user.role_Id == roleEnum.ADMIN) {
        res.status(200);
        next();
        return theUserAuthor.role_Id;
      } else {
        res.status(403).send({
          message: "Require Admin Role!",
        });
        next();
      }
    });
  });
})
};

isAdmin = async (req, res, next) => {
  let tokenRole = req.headers["x-role-token"];
  jwt.verify(tokenRole, MY_APP_SECRET, (err, decod) => {});
  User.findOne({
    where: { email_H: req.email },
  }).then((user) => {
    req.userId = user.id;
    req.role = user.role_Id;
    if (user.role_Id == roleEnum.ADMIN) {
      res.status(200);
      next();
    } else {
      res.status(403).send({
        message: "Require Admin Role!",
      });
    }
  });
};

isManager = (req, res, next) => {
  let tokenRole = req.headers["x-role-token"];
  jwt.verify(tokenRole, MY_APP_SECRET, (err, decod) => {
  });
  User.findOne({
    where: { email_H: req.email },
  }).then((user) => {
    req.userId = user.id;
    req.role = user.role_Id;
    if (user.role_Id >= roleEnum.MANAGER) {
      res.status(200);
      next();
      return user.role_Id;
    } else {
      res.status(403).send({
        message: "Statut de manager obligatoire",
      });
    }
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isProfileOwner: isProfileOwner,
  isRessourceOwner: isRessourceOwner,
  isAdmin: isAdmin,
  isManager: isManager,
};
module.exports = authJwt;
