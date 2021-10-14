const { sequelize , DataTypes } = require('sequelize');


  module.exports = (sequelize) => {
    const likes_type = sequelize.define("likes_type", {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, allowNull: false, primaryKey: true },
      like_name: { type: DataTypes .STRING(30), allowNull: false } ,
      image_URL: { type: DataTypes .STRING(255), allowNull: false } ,
          });
    return likes_type;
  };











