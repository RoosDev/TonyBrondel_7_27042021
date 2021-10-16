// import des extensions necessaires
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cors = require("cors");
const dbConnect = require("./config/db.config");

// instantiation express
const app = express();

// Définition des routes
const feedRoutes = require("./routes/feed_routes");
const usersRoutes = require("./routes/users_routes");

// dbConnect.sequelize.sync({ alter: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

try {
  dbConnect.sequelize.authenticate();
  console.log("Le lapin blanc est dans le terrier.");
} catch (error) {
  console.error("La DB n a pas trouvé le lapin blanc", error);
}

// Sécurisation avec le package Helmet
app.use(helmet());
app.use(
  helmet.frameguard({
    action: "deny",
  })
);

// Gestion des headers
app.use(cors());

// body parser est directement intégré à express maintenant
app.use(express.json());

// Appel des differents modules de l'app
app.use(
  "/Public_Images",
  express.static(path.join(__dirname, "/Public_Images"))
);
app.use("/api/feed", feedRoutes);
app.use("/api/auth", usersRoutes);

module.exports = app;
