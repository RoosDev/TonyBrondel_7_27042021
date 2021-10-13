// const { sequelize , DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes ) => {
    const post_comment_list = sequelize.define('post_comment_list', {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, allowNull: false, primaryKey: true },
      content: { type: DataTypes.TEXT, allowNull: true } ,
      image_URL: { type: DataTypes.STRING(255), allowNull: true } ,
      reference: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true } ,
      timecode: { type: DataTypes.DATE, allowNull: false, required: true } ,
      identity_Id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, required: true } ,
      createdAt:{ type: DataTypes.DATE, allowNull: false, required: true } ,
      updatedAt:{ type: DataTypes.DATE, allowNull: false, required: true } ,
    });
    return post_comment_list;
  };

  module.exports = (sequelize, DataTypes ) => {
    const posts_like = sequelize.define("posts_like", {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, allowNull: false, primaryKey: true },
      post_comment_Id: { type: DataTypes .INTEGER.UNSIGNED } ,
      like_Id: { type: DataTypes .BOOLEAN } ,
      identity_Id: { type: DataTypes .INTEGER.UNSIGNED } ,
          });
    return posts_like;
  };










