const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.homepage = async (req, res) => {

   res.render("home", {
            title: "Home",
        });

}

exports.login = async (req, res) => {
    const checkmail = await User.findOne({email: req.body.email}).lean();
    /*const checkmailId = checkmail._id;*/
    if (checkmail) {
        const checkpassword = await bcrypt.compare(req.body.password, checkmail.password);
        if (checkpassword) {
            const authToken = jwt.sign({_id: checkmail._id.toString()},process.env.TOKEN_KEY/*,{expiresIn: process.env.TOKEN_AGE}*/);
            res.cookie('jwt',authToken, {httpOnly: true} );
            /*res.status(200).json({user: checkmail._id});*/
            res.redirect('tdb');
        }
        else { 
            res.redirect('/');
            /*res.status(400).json({message: 'Ce mot de passe est erronné' })*/
        }
    }
    else { 
        res.redirect('/');
        /*res.status(400).json({message: 'Cette adresse mail est inconnue'})*/
    }

 }
 

