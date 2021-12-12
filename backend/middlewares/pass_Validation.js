const passSchema = require("../models/pass_model");

module.exports = (req, res, next) => {
  if (!passSchema.validate(req.body.password)) {
    res.status(400).send({
      message:
        "Le mot de passe doit contenir au moins 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spéciale. Taille minimum 8 caractères.",
    });
  } else {
    next();
  }
};
