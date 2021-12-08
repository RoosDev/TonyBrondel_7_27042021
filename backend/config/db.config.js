const { Sequelize } = require("sequelize");

// Mise en place des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
const SQLhost = process.env.MYSQL_URL;
const SQLuser = process.env.MYSQL_User;
const SQLpass = process.env.MYSQL_Pass;
const SQLdb = process.env.MYSQL_DBName;
const SQLport = process.env.MYSQL_Port;

// initialisation de la base de donnée.

const sequelize = new Sequelize(SQLdb, SQLuser, SQLpass, {
  host: SQLhost,
  port: SQLport,
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  define: {
    freezeTableName: true,
  },
});

const dbConnect = {};

dbConnect.Sequelize = Sequelize;
dbConnect.sequelize = sequelize;

// Connexion pour le flux des posts
dbConnect.post_comment_list = require("../models/feed_model")(
  sequelize,
  Sequelize
);
// Connexion pour le flux des commentaires
dbConnect.comment_list = require("../models/feed_model")(
  sequelize, 
  Sequelize
);

// Connexion pour les likes des posts
dbConnect.posts_like = require("../models/posts_like_model")(
  sequelize,
  Sequelize
);

// Connexion pour la liste des likes
dbConnect.likes_type = require("../models/likes_model")(
  sequelize, 
  Sequelize
);

// Connexion pour les utilisateurs
dbConnect.users = require("../models/user_model")(
  sequelize, 
  Sequelize
);

// Connexion pour les roles utilisateurs
dbConnect.role = require("../models/userRoles_model")(
  sequelize, 
  Sequelize
);

dbConnect.users.belongsToMany(dbConnect.role, {
  through: "users",
  foreignKey: "role_Id",
  otherKey: "id",
});

dbConnect.ROLES = ["user", "manager", "admin"];

module.exports = dbConnect;
