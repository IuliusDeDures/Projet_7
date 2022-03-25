const peudoValidator = require("password-validator");

// création du schéma du pour un mot de passe pour la validation des entrées
const schemaPseudo = new peudoValidator();

schemaPseudo
    .is().min(3)
    .is().max(100)    
    .has().not().symbols(1, "=");

// vérification de la conformité du mot de passe

module.exports = (req, res, next) => {
    if (schemaPseudo.validate(req.body.pseudo)) {
        next();
    } else {
        return res
            .status(400)
            .json({
                error: "Le pseudo doit contenir au minimum 3 caractères et ne doit pas contenir le symbole = ",
            });
    }
};