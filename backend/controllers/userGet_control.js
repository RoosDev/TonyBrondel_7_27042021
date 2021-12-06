const fs = require("fs");
const CryptoJS = require("crypto-js");
const dbConnect = require("../config/db.config");
const modelUsers = dbConnect.users;
const modelRole = dbConnect.role;

// // Mise en place des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
const CRYPT_PASS = process.env.Crypto_Passphrase;

// Ensemble des Controllers pour récupérer les données. GET

//  La liste des commentaires avec identification de l utilisateur auteur
modelUsers.hasOne(modelRole, {
  sourceKey: "role_Id",
  foreignKey: "id",
  as: "roleUser",
});

// Sélection de tous les profils pour faire un annuaire
exports.getAllProfiles = async (req, res, next) => {
  try {
    const allProfileData = await modelUsers.findAll({
      attributes: [
        "id",
        "firstname",
        "lastname",
        "photo_URL",
        "email_Crypt",
        "job",
        "division",
        "role_Id",
      ],
      include: [
        { model: modelRole, as: "roleUser", attributes: ["role_name"] },
      ],
      where: { active: true },
      order: [["lastname", "ASC"]],
    });
    let data = [];

    allProfileData.forEach((element) => {
      let email_Crypted = element.email_Crypt;
      const decryptEmail = CryptoJS.AES.decrypt(email_Crypted, CRYPT_PASS);
      const emails = decryptEmail.toString(CryptoJS.enc.Utf8);
      let user = {
        id:element.id,
        firstname: element.firstname,
        lastname: element.lastname,
        photo_URL: element.photo_URL,
        email: emails,
        job: element.job,
        division: element.division,
        roleId: element.role_Id,
        role: element.roleUser,
      };
      data.push(user);
    });
    res.send({ data });
  } catch (err) {
    console.log("erreur >> ", err);
    res.sendStatus(500, {
      message: "Some error occurred while retrieving the post's list.",
      err,
    });
  }
};

// Sélection d un profil uniquement
exports.getOneProfile = async (req, res, next) => {
  try {
    const dbData = await modelUsers.findByPk(req.params.id);
    const decrypted = CryptoJS.AES.decrypt(dbData.email_Crypt, CRYPT_PASS);
    const email = decrypted.toString(CryptoJS.enc.Utf8);
    let data = {
      firstname: dbData.firstname,
      lastname: dbData.lastname,
      photo_URL: dbData.photo_URL,
      email: email,
      job: dbData.job,
      division: dbData.division,
    };
    res.send({ data });
  } catch (err) {
    res.sendStatus(500);
    res.statusMessage =
      err.message || "Some error occurred while retrieving the post's list.";
  }
};
