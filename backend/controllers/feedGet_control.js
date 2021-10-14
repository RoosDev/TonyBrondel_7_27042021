const fs = require("fs");
const dbConnect  = require('../config/db.config');
const modelPostCommentList = dbConnect.post_comment_list;
const modelPostsLike = dbConnect.posts_like;
const modelLikesType = dbConnect.likes_type;

// Ensemble des Controllers pour récupérer les données. GET

exports.getAllFeeds = ( async(req, res, next) => {
  try{
    const data = await modelPostCommentList.findAll({where: {reference: null }, order: [['updatedAt', 'DESC']] }) 
    res.send(data)
  }catch(err){
    res.status(500).send({message:err.message || "Some error occurred while retrieving the post's list."});
  }
});

exports.getAllComments = ( async(req, res, next) => {
  try{
    const data = await modelPostCommentList.findAll({where: {reference: req.params.id }, order: [['updatedAt', 'DESC']] }) 
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
