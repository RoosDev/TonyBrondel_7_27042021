const fs = require("fs");
const dbConnect  = require('../config/db.config');
const modelPostCommentList = dbConnect.post_comment_list;
const modelPostsLike = dbConnect.posts_like;
const modelLikesType = dbConnect.likes_type;

exports.getAllFeeds = ( async(req, res, next) => {
  try{
    const data = await modelPostCommentList.findAll({where: {reference: null }, order: [['timecode', 'DESC']] }) 
    res.send(data)
  }catch(err){
    res.status(500).send({message:err.message || "Some error occurred while retrieving the post's list."});
  }
});

exports.getAllComments = ( async(req, res, next) => {
  try{
    const data = await modelPostCommentList.findAll({where: {reference: req.params.id }, order: [['timecode', 'DESC']] }) 
    res.send(data)
  }catch(err){
    res.status(500).send({message:err.message || "Some error occurred while retrieving the post's list."});
  }
});

exports.getLikesPost = ( async(req, res, next) => {
  try{
    const data = await modelPostsLike.findAll({ where: { post_comment_Id: [ req.params.id ] } }) 
    res.send(data)
  }catch(err){
    res.status(500).send({message:err.message || "Some error occurred while retrieving the liker's list."});
  }
});

exports.getLikes = ( async(req, res, next) => {
  try{
    const data = await modelLikesType.findAll({ where: { } }) 
    res.send(data)
  }catch(err){
    res.status(500).send({message:err.message || "Some error occurred while retrieving the liker's list."});
  }
});


// exports.addAVote = (req, res, next) => {
//   const like = req.body.like;
//   const userId = req.body.userId;
//   const feedId = req.params.id;

//   Feed.findOne({ _id: feedId }).then((feedPost) => {
//     switch (like) {
//       case 1:
//         Feed.updateOne(
//           { _id: feedId },
//           { $inc: { likes: +1 }, $push: { usersLiked: userId } }
//         )
//           .then(() =>
//             res
//               .status(200)
//               .json({ message: "Vote enregistrée,  merci pour ce like :D " })
//           )
//           .catch(
//             (error) =>
//               res.status(400).json({ error }) && console.log("big problem")
//           );
//         break;
//       case 0:
//         if (feedPost.usersLiked.includes(userId)) {
//           Feed.updateOne(
//             { _id: feedId },
//             { $inc: { likes: -1 }, $pull: { usersLiked: userId } }
//           )
//             .then(() =>
//               res
//                 .status(200)
//                 .json({ message: "Vous avez changé d'avis, c'est noté :( " })
//             )
//             .catch((error) => res.status(400).json({ error }));
//         } else if (feedPost.usersDisliked.includes(userId)) {
//           Feed.updateOne(
//             { _id: feedId },
//             { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId } }
//           )
//             .then(() =>
//               res
//                 .status(200)
//                 .json({ message: "Vous avez changé d'avis, c'est noté :( " })
//             )
//             .catch((error) => res.status(400).json({ error }));
//         }
//         break;
//       case -1:
//         Feed.updateOne(
//           { _id: feedId },
//           { $inc: { dislikes: +1 }, $push: { usersDisliked: userId } }
//         )
//           .then(() =>
//             res.status(200).json({
//               message: "Vote enregistrée, désolé que vous n'aimiez pas  :( ",
//             })
//           )
//           .catch(
//             (error) =>
//               res.status(400).json({ error }) && console.log("big problem")
//           );
//         break;
//       default:
//         console.log(err);
//     }
//   });
// };
