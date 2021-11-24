const fs = require("fs");

const dbConnect = require("../config/db.config");
const postImage = dbConnect.post_comment_list;

const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    postImage.create({
      content: null,
      image_URL: fs.readFileSync(
        __basedir + "/Public_Images/Posts/" + req.file.filename
      ),
      reference: null,
      identity_Id: req.body.userId,
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/resources/static/assets/tmp/" + image.name,
        image.data
      );

      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};