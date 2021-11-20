const fs = require("fs");
const dbConnect = require("../config/db.config");
const modelUsers = dbConnect.users;

// Ensemble des Controllers pour récupérer les données. GET

// Sélection de tous les profils pour faire un annuaire
exports.getAllProfiles = ( async(req, res, next) => {
  try{
    const data = await modelUsers.findAll({where: {active: true }, order: [['lastname', 'ASC']] }) 
    res.send( { data } )
  }catch(err){
    res.sendStatus(500, {message : "Some error occurred while retrieving the post's list.", err
    })
  }
});

// Sélection d un profil uniquement
exports.getOneProfile = ( async(req, res, next) => {
  try{
    const data = await modelUsers.findByPk(req.params.id) 
    res.send( { data } )
  }catch(err){
    res.sendStatus(500)
    res.statusMessage = err.message || "Some error occurred while retrieving the post's list."
  }
});
