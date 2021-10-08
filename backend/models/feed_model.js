
module.exports = (sequelize, Sequelize) => {
    const PostList = sequelize.define("PostList", {
        content: { type: Sequelize.TEXT } ,
        image_URL: { type: Sequelize.STRING(50) } ,
        reference: { type: Sequelize.INTEGER.UNSIGNED, allowNull: true } ,
        timecode: { type: Sequelize.DATE, allowNull: false, required: true } ,
        identity_Id: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, required: true }
    });
    return PostList;
  };

  module.exports = (sequelize, Sequelize) => {
    const PostLikeList = sequelize.define("PostLikeList", {
        post_comment_Id: { type: Sequelize.INTEGER.UNSIGNED } ,
        like_Id: { type: Sequelize.BOOLEAN } ,
        identity_Id: { type: Sequelize.INTEGER.UNSIGNED } ,
          });
    return PostLikeList;
  };








