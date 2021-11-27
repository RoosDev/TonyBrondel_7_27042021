const fs = require("fs");

const dbConnect = require("../config/db.config");
const postImage = dbConnect.post_comment_list;
const User = dbConnect.users;

const uploadFiles = async (req, res) => {
  try {
    // console.log(" lancement upload file : req.file = >> " , req.file);
    let posterId = 0;
    await User.findOne({
      where: { email_Crypt: req.email },
    }).then( async (user) => {
      posterId = user.id;

      // console.log(" lancement upload file : nom modifié = >> " , req.file.filename);
      // const stringImageUrl = fs.readFileSync( __basedir + "/Public_Images/Posts/" + req.file.filename );
      const buildImageURL =
        "Public_Images/Posts/" + req.file.filename;
      // console.log('url image en back >> ', stringImageUrl);
      console.log("headers >> ", req.headers);
      console.log("user id>>", posterId);

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
          // fs.writeFileSync(
          //   __basedir + "/resources/static/assets/tmp/" + image.name,
          //   image.data
          // );

          return res.send(`image postée.`);
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
