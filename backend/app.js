// import des extensions necessaires
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cors = require('cors');
const dbConnect = require('./config/db.config');

// Définition des routes
const feedRoutes = require("./routes/feed_routes.js");
// const userRoutes = require("./routes/users_routes");

// dbConnect.sequelize.sync({ alter: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

  try {
    dbConnect.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  
// instantiation express
const app = express();

// Gestion des headers
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, "
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   next();
// });

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
app.use("/Public_Images", express.static(path.join(__dirname, "/Public_Images")));
app.use("/api/feed", feedRoutes);
// app.use("/api/auth", userRoutes);

module.exports = app;
