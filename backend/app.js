    // import des extensions necessaires
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const mysql      = require('mysql');


// Définition des routes
// const sauceRoutes = require("./routes/sauce_routes.js");
const userRoutes = require("./routes/users_routes");

// Mise en place des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
const SQLhost = process.env.MYSQL_URL;
const SQLuser = process.env.MYSQL_User;
const SQLpass = process.env.MYSQL_Pass;
const SQLdb = process.env.MYSQL_DBName;
const SQLport = process.env.MYSQL_Port;

//paramétrage de la connexion à MySQL
const connection = mysql.createConnection({
  host     : SQLhost,
  user     : SQLuser,
  password : SQLpass,
  database : SQLdb, 
  port     : SQLport,
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('Yes we are !! Let s go to connecting people ');
});


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
// app.use("/images", express.static(path.join(__dirname, "images")));
// app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

module.exports = connection;
module.exports = app;
