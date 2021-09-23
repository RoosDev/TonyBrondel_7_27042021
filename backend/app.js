    // import des extensions necessaires
const express = require("express");
const helmet = require("helmet");
const path = require("path");

// Définition des routes
const DBConnect = require("./middlewares/mysql");
// const sauceRoutes = require("./routes/sauce_routes.js");
// const userRoutes = require("./routes/user_routes");

// Mise en place des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();
// const URL_MonDb = process.env.URL_DB;

//paramétrage de la connexion à la DB MongoDB




// instantiation express
const app = express();

// Sécurisation avec le package Helmet
app.use(helmet());
app.use(
  helmet.frameguard({
    action: "deny",
  })
);

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

// body parser est directement intégré à express maintenant
app.use(express.json());

// Appel des differents modules de l'app
// app.use("/images", express.static(path.join(__dirname, "images")));
// app.use("/api/sauces", sauceRoutes);
// app.use("/api/auth", userRoutes);

module.exports = app;
