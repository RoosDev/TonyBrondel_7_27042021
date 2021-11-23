const fs = require("fs");
const argon2 = require("argon2");
const dbConnect = require("../config/db.config");
const modelUsers = dbConnect.users;

//--------------------------------------------------------------------------------------------------

// // Mise en place des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
const A2_ASSO_DATA_P = process.env.ARGON2_ASSOCIATEDDATA_password;

//--------------------------------------------------------------------------------------------------


//*******************************************************************//
//                Mise à jour du profil utilisateur                  //
//*******************************************************************//
exports.UpdateProfil = async (req, res, next) => {
  const theProfil = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    job: req.body.job,
    division: req.body.division,
  };
  try {
    const data = await modelUsers.update(theProfil, {
      where: { id: req.params.id },
    });
    res.send({ data });
    (data) => {
      if (data == 1) {
        return (res.statusMessage = "Modification enregistrée");
      } else {
        return (res.statusMessage = "Modification impossible.");
      }
    };
  } catch (err) {
    return (res.sendStatus(500).statusMessage =
      err.message || "Une erreur s'est produite, veuillez réessayer.");
<<<<<<< HEAD
  }
};

//*******************************************************************//
//                  Mise à jour du Role utilisateur                  //
//*******************************************************************//

exports.updateRole = async (req, res, next) => {
  const theRole = {
    role_Id: req.body.role,
  };
  try {
    console.log('id:>>> ', req.body.idToChange)
    const data = await modelUsers.update(theRole, {
      where: { id: req.body.idToChange },
    });
    console.log('data:>>> ', data);
    res.send({ data });

    (data) => {
      if (data == 1) {
        return (res.statusMessage = "Modification enregistrée");
      } else {
        return (res.statusMessage = "Modification impossible.");
      }
    };
  } catch (err) {
    return (res.sendStatus(500).statusMessage =
      err.message || "Une erreur s'est produite, veuillez réessayer.");
=======
>>>>>>> fe3d4773884ad6e15946ae127f0d297f40815fbc
  }
};

//*******************************************************************//
//            Mise à jour du mot de passe utilisateur                //
//*******************************************************************//


exports.UpdatePassword = async (req, res, next) => {
  // //-----------------------------------------------------------------------------------------------//
  //                        TRAITEMENT EN AMONT DES DONNEES AFIN DE LES SECURISER
  // //-----------------------------------------------------------------------------------------------//

  const newPassword_visible = req.body.password;
console.log("pass visible >>" , newPassword_visible)
  // hash du password avec argon2 :
  const newPassword_Hash = await argon2.hash(newPassword_visible, {
    type: argon2.argon2id,
    timeCost: 36,
    hashLength: 256,
    associatedData: Buffer.from(A2_ASSO_DATA_P),
  });

  const theNewPass = {
    password_H: newPassword_Hash,
  };
  try {
    const data = await modelUsers.update(theNewPass, {
      where: { id: req.params.id },
    });
    res.send({ data });
    (data) => {
      if (data == 1) {
        return (res.statusMessage = "Modification enregistrée");
      } else {
        return (res.statusMessage = "Modification impossible.");
      }
    };
  } catch (err) {
    return (res.sendStatus(500).statusMessage =
      err.message || "Some error occurred while retrieving the post's list.");
  }
};

// Mise à jour d'un profil utilisateur
exports.UpdateRole = async (req, res, next) => {
  const theRole = {
    role_Id: req.body.role_Id,
    active: req.body.active,
  };
  try {
    const data = await modelUsers.update(theRole, {
      where: { id: req.params.id },
    });
    res.send({ data });
    (data) => {
      if (data == 1) {
        return (res.statusMessage = "Modification enregistrée");
      } else {
        return (res.statusMessage = "Modification impossible.");
      }
    };
  } catch (err) {
    return (res.sendStatus(500).statusMessage =
      err.message || "Some error occurred while retrieving the post's list.");
  }
};
