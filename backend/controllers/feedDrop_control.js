const fs = require("fs");
const dbConnect  = require('../config/db.config');
const modelPostCommentList = dbConnect.post_comment_list;
const modelPostsLike = dbConnect.posts_like;
const modelLikesType = dbConnect.likes_type;

// Ensemble des Controllers pour récupérer les données. GET


// Suppression d un post uniquement
exports.deleteOnePost = async (req, res, next) => {
  try {
    const data = await modelPostCommentList.destroy(
      { where: { id: req.params.id } }
    );
    res.send({data});
    data  => {
      if (data ==1 ){
        res.statusMessage = "Le post a été supprimé."
      }else{
        res.statusMessage = "Suppression impossible."
      }}
  } catch (err) {
    res.sendStatus(500)
    res.statusMessage = err.message || "Il semble qu'une erreur se soit glissée sur la route. Nous sommes désolé."
  }
};

// Suppression d un post uniquement
exports.deleteOneLike = async (req, res, next) => {
  try {
    const data = await modelPostsLike.destroy(
      { where: { post_comment_Id: req.params.id , identity_Id: req.body.identity_Id } }
    );
    res.send({data});
    data  => {
      if (data ==1 ){
        res.statusMessage = "Le post a été supprimé."
      }else{
        res.statusMessage = "Suppression impossible."
      }}
  } catch (err) {
    res.sendStatus(500)
    res.statusMessage = err.message || "Il semble qu'une erreur se soit glissée sur la route. Nous sommes désolé."
  }
};


// // Sélection des commentaires qui son attachés à un post
// exports.getOneComments = ( async(req, res, next) => {
//   try{
//     const data = await modelPostCommentList.findAll({where: {reference: [ req.params.id ] }, order: [['updatedAt', 'DESC']] }) 
//     res.send(data)
//   }catch(err){
//     res.sendStatus(500)({message:err.message || "Some error occurred while retrieving the post's list."});
//   }
// });

// // Sélection de l'ensemble des likes d un post
// exports.getLikesPost = ( async(req, res, next) => {
//   try{
//     const data = await modelPostsLike.findAll({ where: { post_comment_Id: [ req.params.id ] } }) 
//     res.send(data)
//   }catch(err){
//     res.sendStatus(500)({message:err.message || "Some error occurred while retrieving the liker's list."});
//   }
// });

// // Sélection des différents types de like
// exports.getLikes = ( async(req, res, next) => {
//   try{
//     const data = await modelLikesType.findAll() 
//     res.send(data)
//   }catch(err){
//     res.sendStatus(500)({message:err.message || "Some error occurred while retrieving the liker's list."});
//   }
// });
