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
                { model: modelUsers, as: 'authorPost', attributes:['id', 'firstname', 'lastname', 'job', 'division']},
                { model: modelCommentList, as: 'comment_list', attributes:['id', 'content', 'updatedAt'], include:[{ model: modelUsers, as: 'authorComment', attributes:['id', 'firstname', 'lastname', 'job', 'division']}]},
                { model: modelPostsLike, as: 'like_list', attributes:['id'], include:[{ model: modelLikesType, as: 'LikeType', attributes:['like_name', 'image_URL']}]},
               ],
      where: {reference: null }, 
    //   where: Sequelize.literal("( SELECT `post_comment_list`.`id` AS `postId`, `post_comment_list`.`content` AS `Content`, `post_comment_list`.`image_URL` AS `image_URL`, DATE_FORMAT(`post_comment_list`.`createdAt`,  "%D %b %Y") AS `createdAt`, `authorPost`.`id` AS `authorPostId`, concat(`authorPost`.`firstname`," ", `authorPost`.`lastname`) AS `authorPostName`, `authorPost`.`job` AS `authorPostjob`, `authorPost`.`division` AS `authorPostdivision`, `comment_list`.`id` AS `comment.id`, `comment_list`.`content` AS `comment.content`, DATE_FORMAT(`comment_list`.`createdAt`,  "%D %b %Y") AS `comment.createdAt`, `comment_list->authorComment`.`id` AS `comment.AuthorId`, concat(`comment_list->authorComment`.`firstname`," ", `comment_list->authorComment`.`lastname`) AS `comment.author`, `comment_list->authorComment`.`job` AS `comment.authorJob`, `comment_list->authorComment`.`division` AS `comment.authorDivision`, `like_list`.`id` AS `like.id`, `like_list->LikeType`.`id` AS `like.typeId`, `like_list->LikeType`.`like_name` AS `like.typeName`, `like_list->LikeType`.`image_URL` AS `like.typeImage` FROM `post_comment_list` AS `post_comment_list` LEFT OUTER JOIN `users` AS `authorPost`     ON `post_comment_list`.`identity_Id` = `authorPost`.`id` LEFT OUTER JOIN `post_comment_list` AS `comment_list`     ON `post_comment_list`.`id` = `comment_list`.`reference` LEFT OUTER JOIN `users` AS `comment_list->authorComment`     ON `comment_list`.`identity_Id` = `comment_list->authorComment`.`id` LEFT OUTER JOIN `posts_like` AS `like_list`     ON `post_comment_list`.`id` = `like_list`.`post_comment_Id` LEFT OUTER JOIN `likes_type` AS `like_list->LikeType` ON `like_list`.`like_Id` = `like_list->LikeType`.`id` WHERE `post_comment_list`.`reference` IS NULL ORDER BY `post_comment_list`.`updatedAt` DESC;)"),
    //   // where: Sequelize.literal("(SELECT COUNT(id) as nbPost FROM post_comment_list;)"),
      order: [['updatedAt', 'DESC']] ,
    }) 

    // async function getAllFeeds(page = 1){
    //   const offset = structure.getOffset(page, config.listPerPage);
    //   const rows = await db.query(
    //     'SELECT `post_comment_list`.`id` AS `postId`, `post_comment_list`.`content` AS `Content`, `post_comment_list`.`image_URL` AS `image_URL`, DATE_FORMAT(`post_comment_list`.`createdAt`,  "%D %b %Y") AS `createdAt`, `authorPost`.`id` AS `authorPostId`, concat(`authorPost`.`firstname`," ", `authorPost`.`lastname`) AS `authorPostName`, `authorPost`.`job` AS `authorPostjob`, `authorPost`.`division` AS `authorPostdivision`, `comment_list`.`id` AS `comment.id`, `comment_list`.`content` AS `comment.content`, DATE_FORMAT(`comment_list`.`createdAt`,  "%D %b %Y") AS `comment.createdAt`, `comment_list->authorComment`.`id` AS `comment.AuthorId`, concat(`comment_list->authorComment`.`firstname`," ", `comment_list->authorComment`.`lastname`) AS `comment.author`, `comment_list->authorComment`.`job` AS `comment.authorJob`, `comment_list->authorComment`.`division` AS `comment.authorDivision`, `like_list`.`id` AS `like.id`, `like_list->LikeType`.`id` AS `like.typeId`, `like_list->LikeType`.`like_name` AS `like.typeName`, `like_list->LikeType`.`image_URL` AS `like.typeImage` FROM `post_comment_list` AS `post_comment_list` LEFT OUTER JOIN `users` AS `authorPost`     ON `post_comment_list`.`identity_Id` = `authorPost`.`id` LEFT OUTER JOIN `post_comment_list` AS `comment_list`     ON `post_comment_list`.`id` = `comment_list`.`reference` LEFT OUTER JOIN `users` AS `comment_list->authorComment`     ON `comment_list`.`identity_Id` = `comment_list->authorComment`.`id` LEFT OUTER JOIN `posts_like` AS `like_list`     ON `post_comment_list`.`id` = `like_list`.`post_comment_Id` LEFT OUTER JOIN `likes_type` AS `like_list->LikeType` ON `like_list`.`like_Id` = `like_list->LikeType`.`id` WHERE `post_comment_list`.`reference` IS NULL ORDER BY `post_comment_list`.`updatedAt` DESC, `comment_list`.`createdAt` DESC;'
    //   );
    //   const countLike =  await db.query(
    //     'SELECT post_comment_Id AS post_Id, COUNT(id) AS nbLikes FROM posts_like GROUP BY post_comment_Id'
    //   );
    //   const data = structure.emptyOrRows(rows);
    //   const likes = structure.emptyOrRows(countLike);
    //   const meta = {page};
    
    //   return {
    //     data,
    //     likes,
    //     meta
    //   }
    // }
    
    // module.exports = {
    //   getAllFeeds
    // }
    res.send( { data } );
  }catch(err){
    return res.status(500).json({message: "getAllFeeds : Une erreur s'est produite.", details: err});
  }
});

// Contage du nombre de like pour un post
exports.countLikesPost  = ( async(req, res, next) => {
  try{
    const data = await modelPostsLike.findAll({
      // attributes: {
      //   include: [
      //     // [sequelize.fn('COUNT', sequelize.col('id')), 'likesCount']
      //     [sequelize.literal('( SELECT COUNT(id) as nbLikes FROM posts_like WHERE post_comment_Id = 47)'), 'countLikes']
      //   ],
      // },
      where: Sequelize.literal('( SELECT COUNT(id) as nbLikes FROM posts_like ;)')
    })
    res.send( { data } )
  }catch(err){
    return res.status(500).json({message: "countLikesPost : Une erreur s'est produite.", details: err});
  }
})


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
exports.getLikesPost = ( async(req, res, next) => {
  try{
    const data = await modelPostsLike.findAll({ 
      // attributes: [ 'id', 'post_comment_Id', 'like_Id', 'identity_Id', 'createdAt', [sequelize.fn('count', sequelize.col('id')), 'count'] ], 
      where: { post_comment_Id: [ req.params.id ] } }) 
    return res.send( { data } );
  }catch(err){
    return res.status(500).json({message: "getLikesPost : Une erreur s'est produite.", details: err});
  }
});

// Sélection des différents types de like
exports.getLikes = ( async(req, res, next) => {
  try{
    const data = await modelLikesType.findAll() 
    return res.send( { data } )
  }catch(err){
    return res.status(500).json({message: "getLikes : Une erreur s'est produite.", details: err});
  }
});
