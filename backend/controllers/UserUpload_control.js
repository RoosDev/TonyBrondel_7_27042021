const fs = require("fs");

const dbConnect = require("../config/db.config");
const User = dbConnect.users;

const uploadFiles = async (req, res) => {
  try {
    // console.log(" lancement upload file : req.file = >> " , req.file);
    let posterId = 0;
    await User.findOne({
      where: { email_Crypt: req.email },
    }).then( async (user) => {
      posterId = user.id;

      const buildImageURL =
        "Public_Images/Profile/" + req.file.filename;


      console.log("headers >> ", req.headers);
      console.log("user id>>", posterId);

      if (req.file == undefined) {
        return res.send(`Vous devez sélectionner un fichier.`);
      }
      await User
        .update(
          {photo_URL: buildImageURL}, {
            where: { id: posterId },
        })
        .then((image) => {
          return res.send(`Photo postée.`);
        });
    });
  } catch (error) {
    console.log(error);
    return res.send(`Erreur Fatale ... d'upload: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};
