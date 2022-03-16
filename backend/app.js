const rateLimit = require("express-rate-limit");
const express = require("express");
const app = express();
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const path = require("path");

// configuration du limiteur de requête
const limiteur = rateLimit({
  windowMs: 15 * 60 * 1000, // période 15 minutes
  max: 100, // limite à 100 requête pour 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
});

require("dotenv").config();

// connection à la base de donnée SQL
const database = new Sequelize("groupomania", "root", "$49JulBau72$", {
  dialect: "mysql",
  host: "localhost",
});
try {
  database.authenticate();
  console.log("Connecté à la base de données MySQL!");
} catch (error) {
  console.error("Impossible de se connecter, erreur suivante :", error);
}

app.use(bodyParser.json());

// Utilisation de helmet pour sécuriser le site contre certaines vulnirabilités connues
app.use(helmet());

// application du middleware de limitation de debit à toutes les requêtes
app.use(limiteur);

// middleware pour confiqurer les headers des requêtes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");

  next();
});

// middleware pour la gestion d'image de manière statique
app.use("/images", express.static(path.join(__dirname, "images")));

// middleware pour les routes sauces
app.use("/api/messages", messageRoutes);

// middleware pour les routes users
app.use("/api/auth", userRoutes);

module.exports = app;
