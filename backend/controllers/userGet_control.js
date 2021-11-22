const fs = require("fs");
const CryptoJS = require("crypto-js");
const dbConnect = require("../config/db.config");
const modelUsers = dbConnect.users;

// // Mise en place des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
const CRYPT_PASS = process.env.Crypto_Passphrase;


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
    const dbData = await modelUsers.findByPk(req.params.id) 
    console.log('datass  email>> ', dbData.email_Crypt)
    const decrypted = CryptoJS.AES.decrypt( dbData.email_Crypt, CRYPT_PASS );
    const email = decrypted.toString(CryptoJS.enc.Utf8)
    console.log('email decrypt >> ' , email)
    let data = {
      firstname: dbData.firstname,
      lastname: dbData.lastname,
      email: email,
      job: dbData.job,
      division: dbData.division
    }; 
    console.log(data);
    res.send( { data } )
  }catch(err){
    res.sendStatus(500)
    res.statusMessage = err.message || "Some error occurred while retrieving the post's list."
  }
});
