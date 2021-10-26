const fs = require("fs");
const dbConnect = require("../config/db.config");
const modelUsers = dbConnect.users;

// Mise à jour d'un profil utilisateur
exports.UpdateProfil = async (req, res, next) => {
  const theProfil = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password_H: req.body.password,
    job: req.body.job,
    photo_URL:  `${req.protocol}://${req.get("host")}/Public_Images/Profiles/${
      req.file.filename
    }`,
    division: req.body.division,
  };
  try {
    const data = await modelUsers.update(
       theProfil ,
      { where: { id: req.params.id } }
    );
    res.send( { data } );
    data  => {
      if (data ==1 ){
        return res.statusMessage = "Modification enregistrée";
      }else{
        return res.statusMessage = "Modification impossible.";
      }}
  } catch (err) {
    return res.sendStatus(500).statusMessage = err.message || "Some error occurred while retrieving the post's list.";
  }
};

// Mise à jour d'un profil utilisateur
exports.UpdateRole = async (req, res, next) => {
    const theRole = {
      role_Id: req.body.role_Id,
      active: req.body.active,
    };
    try {
      const data = await modelUsers.update(
        theRole ,
        { where: { id: req.params.id } }
      );
      res.send( { data } );
      data  => {
        if (data ==1 ){
          return res.statusMessage = "Modification enregistrée";
        }else{
          return res.statusMessage = "Modification impossible.";
        }}
    } catch (err) {
      return res.sendStatus(500).statusMessage = err.message || "Some error occurred while retrieving the post's list.";
    }
  };
  