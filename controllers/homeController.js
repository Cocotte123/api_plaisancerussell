const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


/**
     * Affichage de la page d'accueil
     */
exports.homepage = async (req, res) => {

   res.render("home", {
            title: "Home",
        });

}

/**
     * Connexion à l'application :
     * vérification de l'existence du mail saisi: checkmail
     * vérification du mot de passe vs mot de passe crypté
     * création d'un token pour les routes privées (authentification) stocké dans les cookies
     * stockage du nom de l'utilisateur connecté dans les cookies
     * renvoi vers la page de tableau de bord: /tdb
     * user exemple:
     * email: 'tintin@gmail.com', 
     * password: '123456'
     * 
     */
exports.login = async (req, res) => {
    const checkmail = await User.findOne({email: req.body.email}).lean();
    
    
    if (checkmail) {
        const checkpassword = await bcrypt.compare(req.body.password, checkmail.password);
        if (checkpassword) {
            const authToken = jwt.sign({_id: checkmail._id.toString()},process.env.TOKEN_KEY/*,{expiresIn: process.env.TOKEN_AGE}*/);
            res.cookie('jwt',authToken, {httpOnly: true} );
            res.cookie('user',checkmail.name);
            res.redirect('/tdb');
            res.status(200);
        }
        else { 
            res.redirect('/');
            res.status(400);
        }
    }
    else { 
        res.redirect('/');
       
    }

 }
/**
     * Déconnexion à l'application :
     * suppression du token et l'utilisateur dans les cookies
     * redirection vers la page d'accueil
     */
 exports.logout = (req, res) => {
    res.cookie('jwt','',{maxAge:1});
    res.cookie('user','',{maxAge:1});
    res.redirect('/');
 }

 
