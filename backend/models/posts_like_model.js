const { sequelize , DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const posts_like = sequelize.define("posts_like", {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, allowNull: false, primaryKey: true },
      post_comment_Id: { type: DataTypes .INTEGER.UNSIGNED } ,
      like_Id: { type: DataTypes .INTEGER.UNSIGNED } ,
      identity_Id: { type: DataTypes .INTEGER.UNSIGNED } ,
    });
    return posts_like;
  };

