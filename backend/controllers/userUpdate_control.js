const fs = require("fs");
const argon2 = require("argon2");
const CryptoJS = require("crypto-js");
const dbConnect = require("../config/db.config");
const modelUsers = dbConnect.users;

//--------------------------------------------------------------------------------------------------

// // Mise en place des variables d'environnement
const dotenv = require("dotenv");
const { post } = require("../routes/users_routes");
dotenv.config();
const MY_APP_SECRET = process.env.APP_SECRET_KEY;
const A2_ASSO_DATA_P = process.env.ARGON2_ASSOCIATEDDATA_password;
const CRYPT_PASS = process.env.Crypto_Passphrase;
const CRYPT_OutLen = process.env.Crypto_OutPutLength;

//--------------------------------------------------------------------------------------------------

//*******************************************************************//
//                Mise à jour du profil utilisateur                  //
//*******************************************************************//
exports.UpdateProfil = async (req, res, next) => {
  const theProfile = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    job: req.body.job,
    division: req.body.division,
    last_Connexion: Date.now(),
  };
  try {
    const data = await modelUsers.update(theProfile, {
      where: { id: req.headers.id },
    });
    res.send({ data });
    // (data) => {
    //   if (data == 1) {
    //     return (res.statusMessage = "Modification enregistrée");
    //   } else {
    //     return (res.statusMessage = "Modification impossible.");
    //   }
    // };
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Une erreur s'est produite. Veuillez réessayer." });
  }
};

//*******************************************************************//
//                MAJ / Supp du profil de l utilisateur              //
//*******************************************************************//
exports.getOutProfil = async (req, res, next) => {
  // génération d'un password incompatible pour le login
  const DeletePassword_Hash = await argon2.hash(
    "dnv ,d5s14g354*qz f/jhe65r$^m$^mcêlk,zvjknkvkjbnjtnbktlb42g656h5dh4rd65=)=)&é=)ù$am$ ^mgse65q65445qs()dfsdf<*+FE/*+",
    {
      type: argon2.argon2id,
      timeCost: 25,
      hashLength: 217,
      associatedData: Buffer.from("jtnbkhe6tlb5q65445qs()42g6"),
    }
  );

  try {
    // récupération de l'id User
    let posterId = 0;
    await modelUsers
      .findOne({
        where: { email_Crypt: req.email },
      })
      .then(async (user) => {
        posterId = user.id;
        const emailDeleteUnique = "injoignable" + posterId;

        // Définition du profil anonymisé pour suppression
        const theDeleteProfile = {
          firstname: "Utilisateur",
          lastname: "supprimé",
          email_H: emailDeleteUnique,
          email_Crypt: "injoignable",
          password_H: "aucun mot de passe  - DeletePassword_Hash",
          job: "no job",
          photo_URL: null,
          division: "nowhere",
          role_Id: null,
          active: 0,
        };

        // Lancement de l'anonymisation totale équivalente à la suppression
        console.log("[-----lancement suppression  ----------->>");
        const data = await modelUsers.update(theDeleteProfile, {
          where: { id: posterId },
        });
        res.send({ data });
        console.log("----------->> suppression terminée ] ");

        (data) => {
          if (data == 1) {
            console.log("atomisé");
            return (res.statusMessage = "Suppression enregistrée");
          } else {
            console.log("oups it s not delete");
            return (res.statusMessage = "Suppression impossible.");
          }
        };
      });
  } catch (err) {
    return (res.sendStatus(500).statusMessage =
      err.message || "Une erreur s'est produite, veuillez réessayer.");
  }
};

//*******************************************************************//
//            MAJ / supp. profil utilisateur par admin               //
//*******************************************************************//
exports.getOutProfilAdmin = async (req, res, next) => {
  try {
    // récupération de l'id User
    // let posterId = 0;
    // await modelUsers
    //   .findOne({
    //     where: { email_Crypt: req.email },
    //   })
    //   .then(async (user) => {
    //     posterId = user.id;

    const emailDeleteUnique = "injoignable" + req.body.id;
    // Définition du profil anonymisé pour suppression
    const theDeleteProfileAdmin = {
      firstname: "Utilisateur",
      lastname: "supprimé",
      email_H: emailDeleteUnique,
      email_Crypt: "injoignable",
      password_H: "aucun mot de passe  - DeletePassword_Hash",
      job: "no job",
      photo_URL: null,
      division: "nowhere",
      role_Id: null,
      active: 0,
    };
    // Lancement de l'anonymisation totale équivalente à la suppression
    console.log("[-----lancement suppression  ----------->>");
    const data = await modelUsers.update(theDeleteProfileAdmin, {
      where: { id: req.body.id },
    });
    res.send({ data });
    console.log("----------->> suppression terminée ] id:", req.body.id);

    (data) => {
      if (data == 1) {
        console.log("atomisé");
        return (res.statusMessage = "Suppression enregistrée");
      } else {
        console.log("oups it s not delete");
        return (res.statusMessage = "Suppression impossible.");
      }
    };
  } catch (err) {
    return (res.sendStatus(500).statusMessage =
      err.message || "Une erreur s'est produite, veuillez réessayer.");
  }
};

//*******************************************************************//
//                  Mise à jour du Role utilisateur                  //
//*******************************************************************//

exports.updateRole = async (req, res, next) => {
  const theRole = {
    role_Id: req.body.role,
  };

  // Recherche d'une entrée dans la base en fonction de l'email hashé
  const findAdministrator = await modelUsers.findOne({
    where: { id: req.body.idAdmin },
  });

  try {
    if (findAdministrator.id == req.body.idToChange) {
      console.log("Vous ne pouvez pas modifier votre propre rôle.");
      return res.status(401).send({
        message: "Vous ne pouvez pas modifier votre propre rôle.  ",
      });
    } else {
      if (findAdministrator.role_Id < theRole.role_Id) {
        return res.status(401).send({
          message: "Vous ne pouvez pas accorder un rôle supérieur au votre.",
        });
      }
      const data = await modelUsers.update(theRole, {
        where: { id: req.body.idToChange },
      });
      console.log("data:>>> ", data);
      res.send({ data });

      (data) => {
        if (data == 1) {
          return res.status(201).send({
            message: "Modification enregistrée",
          });
        } else {
          return res.status(401).send({
            message: "Modification impossible.",
          });
        }
      };
    }
    // })
  } catch (err) {
    console.log("erreur err : ", err);
    return res.status(500).send({
      message: "Une erreur s'est produite, veuillez réessayer.",
    });
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
      err.message || "Une erreur s'est produite. Veuillez réessayer.");
  }
};

//*******************************************************************//
//            Mise à jour de l'email utilisateur                     //
//*******************************************************************//

exports.UpdateEmail = async (req, res, next) => {
  // //-----------------------------------------------------------------------------------------------//
  //                        TRAITEMENT EN AMONT DES DONNEES AFIN DE LES SECURISER
  // //-----------------------------------------------------------------------------------------------//

  const newEmail_visible = req.body.email;
  console.log("newEmail_visible > ", newEmail_visible);
  // //-----------------------------------------------------------------------------------------------//
  //                        TRAITEMENT EN AMONT DES DONNEES AFIN DE LES SECURISER
  // //-----------------------------------------------------------------------------------------------//

  // hash de l email avec CryptoJS :
  const email_Hash = await CryptoJS.SHA3(newEmail_visible, {
    outputLength: CRYPT_OutLen,
  }).toString();

  // cryptage de l email avec CryptoJS
  const email_Cryp = await CryptoJS.AES.encrypt(
    newEmail_visible,
    CRYPT_PASS
  ).toString();
  // //-----------------------------------------------------------------------------------------------//
  console.log("email_Hash > ", email_Hash);
  console.log("email_Cryp > ", email_Cryp);
  // //-----------------------------------------------------------------------------------------------//
  //                        Vérification d'email en doublon
  // //-----------------------------------------------------------------------------------------------//
  const existOrNot = await modelUsers.findOne({
    where: { email_H: email_Hash },
  });
  if (existOrNot != null) {
    return res.status(409).send({
      message: "Il semble que cet email existe déja.",
    });
  } else {
    const theNewEmail = {
      email_H: email_Hash,
      email_Crypt: email_Cryp,
    };

    try {
      console.log("theNewEmail > ", theNewEmail);
      console.log("req.params.id > ", req.params.id);

      const data = await modelUsers.update(theNewEmail, {
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
      return res.status(500).send({
        message: "Une erreur s'est produite. Veuillez réessayer.",
      });
    }
  }
};
// Mise à jour d'un profil utilisateur
// exports.UpdateRole = async (req, res, next) => {
//   const theRole = {
//     role_Id: req.body.role_Id,
//     active: req.body.active,
//   };
//   try {
//     const data = await modelUsers.update(theRole, {
//       where: { id: req.params.id },
//     });
//     res.send({ data });
//     (data) => {
//       if (data == 1) {
//         return (res.statusMessage = "Modification enregistrée");
//       } else {
//         return (res.statusMessage = "Modification impossible.");
//       }
//     };
//   } catch (err) {
//     return (res.sendStatus(500).statusMessage =
//       err.message || "Some error occurred while retrieving the post's list.");
//   }
// };
