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
const usersRoutes = require('./routes/users_routes');

// Synchronisation des models et de la base (DEV ONLY)
// dbConnect.sequelize.sync({ alter: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

try {
  dbConnect.sequelize.authenticate();
  console.log("Le lapin blanc est dans le terrier.");
} catch (error) {
  console.error("La DB n a pas trouvé le lapin blanc", error);
}
// Gestion des headers
// const corsOptions = {
//   origin: true,
//   allowedHeaders: ['Access-Control-Allow-Headers', 'Content-Type', 'Authorization'],
//   methods: ['GET', 'PUT', 'POST', 'DELETE'], 
// }

app.use(cors());



// Sécurisation avec le package Helmet
app.use(helmet());
app.use(
  helmet.frameguard({
    action: "deny",
  })
);

// body parser est directement intégré à express maintenant
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Appel des differents modules de l'app
app.use(
  "/Public_Images",
  express.static(path.join(__dirname, "/Public_Images"))
);
// app.use(function(req, res, next) {
//   res.header(
//     "Access-Control-Allow-Headers",
//     "x-access-token, Origin, Content-Type, Accept"
//   );
//   next();
// });
app.use("/api/auth", usersRoutes);
app.use("/api/feed", feedRoutes);

module.exports = app;
