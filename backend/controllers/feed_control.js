const fs = require("fs");

const Feed = require("../models/feed_models");

exports.createFeed = (req, res, next) => {
  const feedObject = JSON.parse(req.body.feedPost);
  delete feedObject._id;
  const feedPost = new Feed({
    userId: feedObject.userId,
    name: feedObject.name,
    manufacturer: feedObject.manufacturer,
    description: feedObject.description,
    mainPepper: feedObject.mainPepper,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    heat: feedObject.heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });

  feedPost
    .save()
    .then(() =>
      res.status(201).json({ message: "Post publié." })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyFeed = (req, res, next) => {
  const feedObject = req.file // utilisation d'un opérateur ternaire pour voir si l'objet existe ou non
    ? {
        ...JSON.parse(req.body.feedPost),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Feed.updateOne(
    { _id: req.params.id },
    { ...feedObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Réponse modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteFeed = (req, res, next) => {
  Feed.findOne({ _id: req.params.id })
    .then((feedPost) => {
      const filename = feedPost.imageUrl.split("/images/")[1]; // on découpe l'URL avec comme séparateur /images/ comme ça , ça renvoi 1 tableau avec 2 éléments (1: l url avant /images/ et 2: le nom du fichier). Donc on sélectionne le 2eme élément du tableau
      fs.unlink(`images/${filename}`, () => {
        // fs.unlink fonction de suppression du fichier  avec fs
        Feed.deleteOne({ _id: req.params.id }) // une fois le fichier supprimé on supprime l'objet dans la base
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneFeed = (req, res, next) => {
  Feed.findOne({ _id: req.params.id })
    .then((feedPost) => res.status(200).json(feedPost))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllFeeds = (req, res, next) => {
  Feed.find()
    .then((feeds) => res.status(200).json(feeds))
    .catch((error) => res.status(400).json({ error }));
};

exports.addAVote = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;
  const feedId = req.params.id;

  Feed.findOne({ _id: feedId }).then((feedPost) => {
    switch (like) {
      case 1:
        Feed.updateOne(
          { _id: feedId },
          { $inc: { likes: +1 }, $push: { usersLiked: userId } }
        )
          .then(() =>
            res
              .status(200)
              .json({ message: "Vote enregistrée,  merci pour ce like :D " })
          )
          .catch(
            (error) =>
              res.status(400).json({ error }) && console.log("big problem")
          );
        break;
      case 0:
        if (feedPost.usersLiked.includes(userId)) {
          Feed.updateOne(
            { _id: feedId },
            { $inc: { likes: -1 }, $pull: { usersLiked: userId } }
          )
            .then(() =>
              res
                .status(200)
                .json({ message: "Vous avez changé d'avis, c'est noté :( " })
            )
            .catch((error) => res.status(400).json({ error }));
        } else if (feedPost.usersDisliked.includes(userId)) {
          Feed.updateOne(
            { _id: feedId },
            { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId } }
          )
            .then(() =>
              res
                .status(200)
                .json({ message: "Vous avez changé d'avis, c'est noté :( " })
            )
            .catch((error) => res.status(400).json({ error }));
        }
        break;
      case -1:
        Feed.updateOne(
          { _id: feedId },
          { $inc: { dislikes: +1 }, $push: { usersDisliked: userId } }
        )
          .then(() =>
            res.status(200).json({
              message: "Vote enregistrée, désolé que vous n'aimiez pas  :( ",
            })
          )
          .catch(
            (error) =>
              res.status(400).json({ error }) && console.log("big problem")
          );
        break;
      default:
        console.log(err);
    }
  });
};
