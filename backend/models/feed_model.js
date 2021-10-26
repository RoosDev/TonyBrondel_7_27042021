const { sequelize , DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const post_comment_list = sequelize.define('post_comment_list', {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, allowNull: false, primaryKey: true },
      content: { type: DataTypes.TEXT, allowNull: true } ,
      image_URL: { type: DataTypes.STRING(255), allowNull: true } ,
      reference: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true } ,
      identity_Id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true } ,
      createdAt:{ type: DataTypes.DATE, allowNull: true, required: true } ,
      updatedAt:{ type: DataTypes.DATE, allowNull: true, required: true } ,
    });
    return post_comment_list;
  };

