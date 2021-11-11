const { sequelize , DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const users_roles = sequelize.define('users_roles', {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, allowNull: false, primaryKey: true },
      role_Name: { type: DataTypes.STRING(50), allowNull: false } ,
      image_URL: { type: DataTypes.STRING(255), allowNull: true } ,
      createdAt:{ type: DataTypes.DATE, allowNull: false, required: true } ,
      updatedAt:{ type: DataTypes.DATE, allowNull: false, required: true } ,
    });
    return users_roles;
  };
