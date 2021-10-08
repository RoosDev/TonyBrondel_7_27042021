const Sequelize = require("Sequelize");

// Mise en place des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
const SQLhost = process.env.MYSQL_URL;
const SQLuser = process.env.MYSQL_User;
const SQLpass = process.env.MYSQL_Pass;
const SQLdb = process.env.MYSQL_DBName;
const SQLport = process.env.MYSQL_Port;

// initialisation de la base de donnée.


const sequelize  = new Sequelize(SQLdb, SQLuser, SQLpass, {
  host: SQLhost,
  port: SQLport,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },  

});  

const dbConnect = {};

dbConnect.Sequelize = Sequelize;
dbConnect.sequelize = sequelize;

dbConnect.PostList = require("../models/feed_model")(sequelize, Sequelize);

module.exports= dbConnect;