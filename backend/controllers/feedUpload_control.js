const fs = require("fs");

const dbConnect = require("../config/db.config");
const postImage = dbConnect.post_comment_list;
const User = dbConnect.users;

const uploadFiles = async (req, res) => {
  try {
    let posterId = 0;
    await User.findOne({
      where: { email_H: req.email },
    }).then( async (user) => {
      console.log("req.file.filename>>", req);

      posterId = user.id;
      const buildImageURL =
        "Public_Images/Posts/" + req.file.filename;
      console.log("headers >> ", req.headers);

      if (req.file == undefined) {
        return res.send(`Vous devez sélectionner un fichier.`);
      }
      await postImage
        .create({
          content: null,
          image_URL: buildImageURL,
          reference: null,
          identity_Id: posterId,
        })
        .then((image) => {
          return res.send(`Image publiée`);
        });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({message:`Erreur lors de l'upload.`});
  }
};

module.exports = {
  uploadFiles,
};
