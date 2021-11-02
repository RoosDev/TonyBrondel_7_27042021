const fs = require("fs");
const dbConnect  = require('../config/db.config');
const modelPostList = dbConnect.post_comment_list;
const modelCommentList = dbConnect.comment_list;
const modelPostsLike = dbConnect.posts_like;
const modelLikesType = dbConnect.likes_type;
const modelUsers = dbConnect.users;


// Union des DB relationnelles

modelPostList.hasOne(modelUsers, { 
  sourceKey: "identity_Id", 
  foreignKey:"id",  
  as: "author" 
} )


modelPostList.hasMany(modelCommentList, { 
  sourceKey: 'id', 
  foreignKey:'reference', 
  as: "comment_list" 
} )


// Ensemble des Controllers pour récupérer les données. GET

// Sélection des post pour alimenter le flux
exports.getAllFeeds = ( async(req, res, next) => {
  try{
    const data = await modelPostList.findAll({include: ["author", "comment_list"], where: {reference: null }, order: [['updatedAt', 'DESC']] }) 
    res.send( { data } )
  }catch(err){
    res.sendStatus(500)
    res.statusMessage = err.message || "Some error occurred while retrieving the post's list."
  }
});

// Sélection d un post uniquement
exports.getOneFeed = ( async(req, res, next) => {
  try{
    const data = await modelPostList.findByPk(req.params.id) 
    res.send( { data } )
  }catch(err){
    res.sendStatus(500)
    res.statusMessage = err.message || "Some error occurred while retrieving the post's list."
  }
});

// Sélection des commentaires qui son attachés à un post
exports.getAllComments = ( async(req, res, next) => {
  try{
    const data = await modelCommentList.findAll({where: {reference: [ req.params.id ] }, order: [['updatedAt', 'DESC']] }) 
    return res.send( { data } );
  }catch(err){
    return res.sendStatus(500).statusMessage = err.message || "Some error occurred while retrieving the post's list.";
  }
});

// Sélection de l'ensemble des likes d un post
exports.getLikesPost = ( async(req, res, next) => {
  try{
    const data = await modelPostsLike.findAll({ where: { post_comment_Id: [ req.params.id ] } }) 
    return res.send( { data } );
  }catch(err){
    return res.sendStatus(500).statusMessage = err.message || "Some error occurred while retrieving the post's list."
  }
});

// Sélection des différents types de like
exports.getLikes = ( async(req, res, next) => {
  try{
    const data = await modelLikesType.findAll() 
    return res.send( { data } )
  }catch(err){
    return res.sendStatus(500).statusMessage = err.message || "Some error occurred while retrieving the post's list."
  }
});
