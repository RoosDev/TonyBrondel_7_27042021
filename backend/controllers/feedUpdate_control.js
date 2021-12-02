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
  };
  try {
    const data = await modelPostCommentList.update(thePost, {
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



// exports.getLikes = ( async(req, res, next) => {
//   try{
//     const data = await modelLikesType.findAll({ where: { } })
//     return res.send( { data } )
//   }catch(err){
// return res.sendStatus(500).statusMessage = err.message || "Some error occurred while retrieving the post's list.";
//   }
// });
