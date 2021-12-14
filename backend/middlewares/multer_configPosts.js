const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Seule les images sont autorisées.", false)
    // res.status(401).send({message : "Seule les images sont autorisées."});
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "../../web/public/Public_Images/Posts/");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    const justName = name.split("." + extension).join("__");
    const filename = justName + Date.now() + "." + extension;
    cb(null, filename);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;








