const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');

const PostList = sequelize.define('PostList', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER.UNSIGNED
  },
  content: {
    type: DataTypes.TEXT,
  },
  image_URL: {
    type: DataTypes.VARCHAR
  },
  reference: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true
  },
  timecode: {
    type: DataTypes.DATE,
    allowNull: false
  },

  identity_Id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  type_Post: {
    type: DataTypes.VARCHAR,
    allowNull: true
  },


}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(PostList === sequelize.models.PostList); // true
