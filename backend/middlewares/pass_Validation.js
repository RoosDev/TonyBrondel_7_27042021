const passSchema = require("../models/pass_model");

module.exports = (req, res, next) => {
  console.log('pass1  >>  ' + req.body.password);
  console.log('body  >>  ' + JSON.stringify(req.body));
  if (!passSchema.validate(req.body.password)) {
    res.status(400).json({
      message:
        "Le mot de passe doit contenir au moins 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spéciale. Taille minimum 8 caractères.",
    });
  } else {
    next();
  }
};
