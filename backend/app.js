    // import des extensions necessaires
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const Sequelize = require("sequelize");

// Définition des routes
const feedRoutes = require("./routes/feed_routes.js");
// const userRoutes = require("./routes/users_routes");

// Mise en place des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
const SQLhost = process.env.MYSQL_URL;
const SQLuser = process.env.MYSQL_User;
const SQLpass = process.env.MYSQL_Pass;
const SQLdb = process.env.MYSQL_DBName;
const SQLport = process.env.MYSQL_Port;


const connection = new Sequelize(SQLdb, SQLuser, SQLpass, {
  host: SQLhost,
  port: SQLport,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },  

});  

try {
  connection.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


// instantiation express
const app = express();

// Gestion des headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, "
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Sécurisation avec le package Helmet
app.use(helmet());
app.use(
  helmet.frameguard({
    action: "deny",
  })
);


// body parser est directement intégré à express maintenant
app.use(express.json());

// Appel des differents modules de l'app
// app.use("/Public_Images", express.static(path.join(__dirname, "images")));
app.use("/api/feed", feedeRoutes);
// app.use("/api/auth", userRoutes);

module.exports = connection;
module.exports = app;
