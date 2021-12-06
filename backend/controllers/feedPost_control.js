const dbConnect = require("../config/db.config");
const modelPostCommentList = dbConnect.post_comment_list;
const modelPostsLike = dbConnect.posts_like;
// const modelLikesType = dbConnect.likes_type;

// Ensemble des Controllers pour créer une donnée : POST

// POST pour un post du feed
exports.PostPost = async (req, res, next) => {
  const thePost = {
    content: req.body.content,
    image_URL: null,
    reference: null,
    identity_Id: req.body.userId,
  };
  try {
      const createdPost = await modelPostCommentList.create(thePost);
      
      return res.status(201).json( createdPost );
  } catch (err) {
    return res.status(500).json({message: "Une erreur s'est produite, le message n'est pas enregistré.", details: err});
  }
};

// POST d'un commentaire concernant un post du feed
exports.PostComment = async (req, res, next) => {
  const theComment = {
    content: req.body.content,
    reference: req.params.id,
    identity_Id: req.body.userId,
  };
  try {
    if(theComment.content != undefined  &&
        theComment.content != ''  &&
        theComment.reference != undefined  &&
        theComment.reference != '' &&
        theComment.identity_Id != undefined  &&
        theComment.identity_Id != ''){
    await modelPostCommentList.create(theComment);
    return res.status(201).json({ theComment } )}
  } catch (err) {
    return res.status(500).json({error: "Une erreur s'est produite, le commentaire n'est pas enregistré.", details: err})
  }
};

// Ajout d'un like sur un post du flux
exports.PostLike = async (req, res, next) => {
  const theComment = {
    post_comment_Id: req.params.id,
    like_Id: 1,
    identity_Id: req.body.userId,
  };
  try {
    const data = await modelPostsLike.create(theComment);
    return res.send( { data } ).status(201);
  } catch (err) {
    return res.status(500).json({ error: "Une erreur s'est produite, le like n'est pas enregistré.", details: err})
  }
};


// exports.getLikes = ( async(req, res, next) => {
//   try{
//     const data = await modelLikesType.findAll({ where: { } })
//     return res.send( { data } );
//   }catch(err){
  // return res.sendStatus(500).statusMessage = err.message || "Some error occurred while retrieving the post's list.";
//   }
// });
