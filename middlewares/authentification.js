const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
     *Vérification de la présence d'un token dans les cookies
     *Vérification qu'il est conforme à la clé secrète
     *si ok passage au controller
     *si non retour à la page d'accueil
     */

const authentification = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, (err,decodedToken) => {
            if (err) {
                console.log(err.message);
                
                res.redirect('/');
            }
            else {
                console.log(decodedToken);
                next();
            }
        })
    }
    else {
        res.redirect('/');
        
    }
}

module.exports = {authentification};