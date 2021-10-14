const fs = require("fs");
const dbConnect = require("../config/db.config");
const modelPostCommentList = dbConnect.post_comment_list;
const modelPostsLike = dbConnect.posts_like;
const modelLikesType = dbConnect.likes_type;

// Ensemble des Controllers pour créer une donnée : POST

// Mise à jour d'un post du feed
exports.UpdatePost = async (req, res, next) => {
  const thePost = {
    content: req.body.content,
    image_URL: req.body.image_URL,
  };
  try {
    const data = await modelPostCommentList.update(
       thePost ,
      { where: { id: req.params.id } }
    );
    res.send(data)
    const answerSending;
    if (answerSending ==1 ){
      res.send({message: "Modification enregistrée."})
    }else{
      res.send({message: "Modification impossible."})
    };
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Il semble qu'une erreur se soit glissée sur la route. Nous sommes désolé.",
    });
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
//     res.send(data);
//   } catch (err) {
//     res
//       .status(500)
//       .send({
//         message:
//           err.message ||
//           "Some error occurred while retrieving the post's list.",
//       });
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
//     res.send(data);
//   } catch (err) {
//     res
//       .status(500)
//       .send({
//         message:
//           err.message ||
//           "Some error occurred while retrieving the post's list.",
//       });
//   }
// };

// exports.getLikes = ( async(req, res, next) => {
//   try{
//     const data = await modelLikesType.findAll({ where: { } })
//     res.send(data)
//   }catch(err){
//     res.status(500).send({message:err.message || "Some error occurred while retrieving the liker's list."});
//   }
// });
