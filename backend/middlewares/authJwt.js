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

isRessourceOwner = async(req, res, next) => {
  modelPostList.findByPk(req.params.id)
  .then((thePost) => {
    console.log('thePost => ', thePost )
  })
  
  res.send( { reqInit } )
console.log('reqinit >>' ,reqInit)

 
  User.findOne({
    where: { email_Crypt: req.email },
  }).then((user) => {
    req.userId = user.id;
    req.role = user.role_Id;
    console.log("req id admin >> ", req.userId);
    console.log("req email admin >> ", req.email);
    console.log("role admin >> ", user.role_Id);
    if (user.role_Id == 3) {
      console.log("ça y est , on a les droits et pour pas cher en plus !");
      res.status(200)
      next();
      return user.role_Id;
    } else {
      console.log("désolé , mais on passe son chemin !!");
      res.status(403).send({
        message: "Require Admin Role!",
      });
    }
  });

}

isAdmin = async (req, res, next) => {
  let tokenRole = req.headers["x-role-token"];
  jwt.verify(tokenRole, MY_APP_SECRET, (err, decod) => {
  });
  User.findOne({
    where: { email_Crypt: req.email },
  }).then((user) => {
    req.userId = user.id;
    req.role = user.role_Id;
    console.log("req id admin >> ", req.userId);
    console.log("req email admin >> ", req.email);
    console.log("role admin >> ", user.role_Id);
    if (user.role_Id == 3) {
      console.log("ça y est , on a les droits et pour pas cher en plus !");
      res.status(200)
      next();
      return user.role_Id;
    } else {
      console.log("désolé , mais on passe son chemin !!");
      res.status(403).send({
        message: "Require Admin Role!",
      });
    }
  });
};

isManager = (req, res, next) => {
  let tokenRole = req.headers["x-role-token"];
  jwt.verify(tokenRole, MY_APP_SECRET, (err, decod) => {
    console.log("decod role >> ", decod)
  });
  User.findOne({
    where: { email_Crypt: req.email },
  }).then((user) => {
    req.userId = user.id;
    req.role = user.role_Id;
    console.log("req id manager >> ", req.userId);
    console.log("req email manager >> ", req.email);
    console.log("role manager>> ", user.role_Id);
    if (user.role_Id >= 2) {
      res.status(200)
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
  isAdmin: isAdmin,
  isManager: isManager,
};
module.exports = authJwt;
