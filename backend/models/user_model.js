module.exports = (sequelize, DataTypes ) => {
    const users = sequelize.define('users', {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, allowNull: false, primaryKey: true },
      firstname: { type: DataTypes.STRING(50), allowNull: false } ,
      lastname: { type: DataTypes.STRING(50), allowNull: false } ,
      email_H: { type: DataTypes.STRING(255), allowNull: false } ,
      email_Crypt: { type: DataTypes.STRING(255), allowNull: false, } ,
      password_H: { type: DataTypes.STRING(255), allowNull: false, required: true } ,
      job: { type: DataTypes.STRING(50), allowNull: true } ,
      photo_URL: { type: DataTypes.STRING(255), allowNull: true } ,
      division: { type: DataTypes.STRING(75), allowNull: true } ,
      role_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true } ,
      active: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true } ,
      last_Connexion: { type: DataTypes.DATE, allowNull: true } ,
      createdAt:{ type: DataTypes.DATE, allowNull: false, required: true } ,
      updatedAt:{ type: DataTypes.DATE, allowNull: false, required: true } ,
    });
    return users;
  };
