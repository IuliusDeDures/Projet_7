const emailValidator = require("validator")

// controle la validation de l'email

module.exports = (req, res, next) => {
    const email = req.body.email;
    if(emailValidator.isEmail(email)){
        next();
    }else{
        return res
        .status(400)
        .json({error : `L'email ${email} n'est pas valide !`})
    }
};