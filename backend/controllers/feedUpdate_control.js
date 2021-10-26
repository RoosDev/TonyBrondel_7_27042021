const fs = require("fs");
const dbConnect = require("../config/db.config");
const modelPostCommentList = dbConnect.post_comment_list;
const modelPostsLike = dbConnect.posts_like;
const modelLikesType = dbConnect.likes_type;

// Ensemble des Controllers pour créer une donnée : POST

// Mise à jour d'un post du feed
exports.UpdatePost = async (req, res, next) => {
  const postObject = req.file // utilisation d'un opérateur ternaire pour voir si l'objet existe ou non
    ? {
        ...JSON.parse(req.body.sauce),
        image_URL: `${req.protocol}://${req.get("host")}/Public_Images/Posts/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  
  const thePost = {
    content: req.body.content,
    image_URL: postObject,
  };
  try {
    const data = await modelPostCommentList.update(
       thePost ,
      { where: { id: req.params.id } }
    );
    res.send( { data } );
    data  => {
      if (data ==1 ){
        return res.statusMessage = "Modification enregistrée";
      }else{
        return res.statusMessage = "Modification impossible.";
      }}
  } catch (err) {
    return res.sendStatus(500).statusMessage = err.message || "Some error occurred while retrieving the post's list.";
  }
};

// Mise à jour d'un commentaire concernant un post du feed
// exports.PostComment = async (req, res, next) => {
//   const theComment = {
//     content: req.body.content,
//     reference: req.params.id,
//     identity_Id: req.body.userId,
//   };
//   try {
//     const data = await modelPostCommentList.create(theComment);
//     return res.send( { data } );
//   } catch (err) {
  // return res.sendStatus(500).statusMessage = err.message || "Some error occurred while retrieving the post's list.";
//   }
// };

// // Mise à jour d'un like sur un post du flux
// exports.PostLike = async (req, res, next) => {
//   const theComment = {
//     post_comment_Id: req.params.id,
//     like_Id: 1,
//     identity_Id: req.body.userId,
//   };
//   try {
//     const data = await modelPostsLike.create(theComment);
//     return res.send( { data } );
//   } catch (err) {
  //return  res.sendStatus(500).statusMessage = err.message || "Some error occurred while retrieving the post's list.";
//   }
// };

// exports.getLikes = ( async(req, res, next) => {
//   try{
//     const data = await modelLikesType.findAll({ where: { } })
//     return res.send( { data } )
//   }catch(err){
  // return res.sendStatus(500).statusMessage = err.message || "Some error occurred while retrieving the post's list.";
//   }
// });
