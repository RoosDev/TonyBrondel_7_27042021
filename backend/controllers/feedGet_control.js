const fs = require("fs");
const { Sequelize } = require("sequelize");
const dbConnect  = require('../config/db.config');
const modelPostList = dbConnect.post_comment_list;
const modelCommentList = dbConnect.comment_list;
const modelPostsLike = dbConnect.posts_like;
const modelLikesType = dbConnect.likes_type;
const modelUsers = dbConnect.users;

// const db = require('../services/db');
// const structure = require('../services/helper');
// const config = require('../config/mysql.config');




// Union des DB relationnelles

    // la liste des posts avec identification de l utilisateur auteur
modelPostList.hasOne(modelUsers, { 
  sourceKey: "identity_Id", 
  foreignKey:"id",  
  as: "authorPost" 
} )

    // La liste des posts avec pour chacun la liste des commentaires associés
modelPostList.hasMany(modelCommentList, { 
  model: 'comment_list',
  sourceKey: 'id', 
  foreignKey:'reference', 
  as: "comment_list" 
} )

  // La liste des posts avec pour chacun le nombre de likes associés
  modelPostList.hasMany(modelPostsLike, { 
    sourceKey: 'id', 
    foreignKey:'post_comment_Id', 
    as: "like_list" 
  } )

 //  La liste des commentaires avec identification de l utilisateur auteur
 modelPostsLike.hasOne(modelLikesType, { 
      sourceKey: "like_Id", 
      foreignKey:"id",  
      as: "LikeType" 
    } )
    
    //  La liste des commentaires avec identification de l utilisateur auteur
modelCommentList.hasOne(modelUsers, { 
  sourceKey: "identity_Id", 
  foreignKey:"id",  
  as: "authorComment" 
} )


// Ensemble des Controllers pour récupérer les données. GET

// Sélection des post pour alimenter le flux
exports.getAllFeeds = ( async(req, res, next) => {
  try{
    const data = await modelPostList.findAll({
      attributes: ['id', 'content', 'image_URL','createdAt'],
      include: [
                { model: modelUsers, as: 'authorPost', attributes:['id', 'firstname', 'lastname', 'photo_URL', 'job', 'division', 'photo_URL']},
                { model: modelCommentList, as: 'comment_list', attributes:['id', 'content', 'updatedAt'], include:[{ model: modelUsers, as: 'authorComment', attributes:['id', 'firstname', 'lastname', 'job', 'division']}]},
                { model: modelPostsLike, as: 'like_list', attributes:['id'], include:[{ model: modelLikesType, as: 'LikeType', attributes:['like_name', 'image_URL']}]},
               ],
      where: {reference: null }, 
      order: [['updatedAt', 'DESC']] ,
    }) 

    res.send( { data } );
  }catch(err){
    return res.sendStatus(500, {message: "getAllFeeds : Une erreur s'est produite.", details: err});
  }
});

// Contage du nombre de like pour un post
// exports.countLikesPost  = ( async(req, res, next) => {
//   try{
//     const data = await modelPostsLike.findAll({
//       where: Sequelize.literal('( SELECT COUNT(id) as nbLikes FROM posts_like ;)')
//     })
//     res.send( { data } )
//   }catch(err){
//     return res.status(500).json({message: "countLikesPost : Une erreur s'est produite.", details: err});
//   }
// })


// Sélection d un post uniquement
exports.getOneFeed = ( async(req, res, next) => {
  try{
    const data = await modelPostList.findByPk(req.params.id) 
    res.send( { data } )
  }catch(err){
    return res.status(500).json({message: "getOneFeed : Une erreur s'est produite.", details: err});
  }
});

// Sélection des commentaires qui son attachés à un post
exports.getAllComments = ( async(req, res, next) => {
  try{
    const data = await modelCommentList.findAll({include: ["authorComment"], where: {reference: [ req.params.id ] }, order: [['updatedAt', 'DESC']] }) 
    return res.send( { data } );
  }catch(err){
    return res.status(500).json({message: "getAllComments : Une erreur s'est produite.", details: err});
  }
});

// Sélection de l'ensemble des likes d un post
// exports.getLikesPost = ( async(req, res, next) => {
//   try{
//     const data = await modelPostsLike.findAll({ 
//       // attributes: [ 'id', 'post_comment_Id', 'like_Id', 'identity_Id', 'createdAt', [sequelize.fn('count', sequelize.col('id')), 'count'] ], 
//       where: { post_comment_Id: [ req.params.id ] } }) 
//     return res.send( { data } );
//   }catch(err){
//     return res.status(500).json({message: "getLikesPost : Une erreur s'est produite.", details: err});
//   }
// });

// Sélection des différents types de like
// exports.getLikes = ( async(req, res, next) => {
//   try{
//     const data = await modelLikesType.findAll() 
//     return res.send( { data } )
//   }catch(err){
//     return res.status(500).json({message: "getLikes : Une erreur s'est produite.", details: err});
//   }
// });
