const rateLimit = require("express-rate-limit");
const express = require("express");
const app = express();
const helmet = require("helmet");
const bodyParser = require("body-parser");

// configuration du limiteur de requête
const limiteur = rateLimit({
    windowMs: 15 * 60 * 1000, // période 15 minutes
    max: 100, // limite à 100 requête pour 15 minutes
    standardHeaders: true,
    legacyHeaders: false,
});

require("dotenv").config();


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



module.exports = app;