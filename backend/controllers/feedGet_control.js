const fs = require("fs");
const dbConnect  = require('../config/db.config');
const modelPostCommentList = dbConnect.post_comment_list;
const modelPostsLike = dbConnect.posts_like;
const modelLikesType = dbConnect.likes_type;

// Ensemble des Controllers pour récupérer les données. GET

// Sélection des post pour alimenter le flux
exports.getAllFeeds = ( async(req, res, next) => {
  try{
    const data = await modelPostCommentList.findAll({where: {reference: null }, order: [['updatedAt', 'DESC']] }) 
    res.send( { data } )
  }catch(err){
    res.sendStatus(500)
    res.statusMessage = err.message || "Some error occurred while retrieving the post's list."
  }
});

// Sélection d un post uniquement
exports.getOneFeed = ( async(req, res, next) => {
  try{
    const data = await modelPostCommentList.findByPk(req.params.id) 
    res.send( { data } )
  }catch(err){
    res.sendStatus(500)
    res.statusMessage = err.message || "Some error occurred while retrieving the post's list."
  }
});

// Sélection des commentaires qui son attachés à un post
exports.getAllComments = ( async(req, res, next) => {
  try{
    const data = await modelPostCommentList.findAll({where: {reference: [ req.params.id ] }, order: [['updatedAt', 'DESC']] }) 
    res.send( { data } )
  }catch(err){
    res.sendStatus(500)
    res.statusMessage = err.message || "Some error occurred while retrieving the post's list."
  }
});

// Sélection de l'ensemble des likes d un post
exports.getLikesPost = ( async(req, res, next) => {
  try{
    const data = await modelPostsLike.findAll({ where: { post_comment_Id: [ req.params.id ] } }) 
    res.send( { data } )
  }catch(err){
    res.sendStatus(500)
    res.statusMessage = err.message || "Some error occurred while retrieving the post's list."
  }
});

// Sélection des différents types de like
exports.getLikes = ( async(req, res, next) => {
  try{
    const data = await modelLikesType.findAll() 
    res.send( { data } )
  }catch(err){
    res.sendStatus(500)
    res.statusMessage = err.message || "Some error occurred while retrieving the post's list."
  }
});
