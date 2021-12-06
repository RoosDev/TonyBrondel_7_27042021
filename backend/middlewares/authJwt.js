const jwt = require("jsonwebtoken");
const dbConnect = require("../config/db.config");
const User = dbConnect.users;
const modelPostCommentList = dbConnect.post_comment_list;

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
  console.log("Voyons si c est son profil");
  User.findByPk(req.body.id).then((theProfile) => {
    console.log('is his profile - search >> ' , theProfile)
    User.findOne({
      where: { email_Crypt: req.email },
    }).then((theUserProfile) => {
      console.log('the user s profile >>  ' , theUserProfile)
      if (theUserProfile.id == theProfile.id) {
        console.log('is the same >> ' , theUserProfile.id == theProfile.id )
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

isRessourceOwner = async (req, res, next) => {
  console.log("Voyons si c est l auteur");
  modelPostCommentList.findByPk(req.params.id).then((thePost) => {
    console.log("thePost => ", thePost);

    console.log(req.email);
    User.findOne({
      where: { email_Crypt: req.email },
    }).then((theUserAuthor) => {
      console.log("req id admin >> ", thePost.identity_Id);
      console.log("id user >> ", theUserAuthor.id);
      if (theUserAuthor.id == thePost.identity_Id) {
        console.log("ça y est , on a les droits et pour pas cher en plus !");
        res.status(200);
        next();
        return theUserAuthor.role_Id;
      } else {
        console.log("désolé , mais on passe son chemin !!");
        res.status(403).send({
          message: "Require Admin Role!",
        });
        next();
      }
    });
  });
};

isAdmin = async (req, res, next) => {
  console.log("Voyons si ce user est admin !! ");
  let tokenRole = req.headers["x-role-token"];
  jwt.verify(tokenRole, MY_APP_SECRET, (err, decod) => {});
  User.findOne({
    where: { email_Crypt: req.email },
  }).then((user) => {
    req.userId = user.id;
    req.role = user.role_Id;
    if (user.role_Id == 3) {
      console.log("ça y est , on a les droits et pour pas cher en plus !");
      res.status(200);
      next();
      // return user.role_Id;
    } else {
      console.log("désolé , mais on passe son chemin !!");
      res.status(403).send({
        message: "Require Admin Role!",
      });
    }
  });
};

isManager = (req, res, next) => {
  console.log("Voyons si ce user est Manager");
  let tokenRole = req.headers["x-role-token"];
  jwt.verify(tokenRole, MY_APP_SECRET, (err, decod) => {
    console.log("decod role >> ", decod);
  });
  User.findOne({
    where: { email_Crypt: req.email },
  }).then((user) => {
    req.userId = user.id;
    req.role = user.role_Id;
    // console.log("req id manager >> ", req.userId);
    // console.log("req email manager >> ", req.email);
    // console.log("role manager>> ", user.role_Id);
    if (user.role_Id == 2) {
      res.status(200);
      next();
      return user.role_Id;
    } else {
      res.status(403).send({
        message: "Require Moderator Role!",
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
