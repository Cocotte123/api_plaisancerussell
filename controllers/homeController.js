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
    const checkmailId = checkmail._id;
    if(!checkmail) {
        res.send('Cette adresse mail est inconnue')
    }
    const checkpassword = await bcrypt.compare(req.body.password, checkmail.password);
    const authToken = jwt.sign({_id: checkmailId.toString()},process.env.TOKEN_KEY);
    if(checkpassword) {
        await User.findOneAndUpdate({
           authToken: authToken
        }).where(checkmailId).lean();
        res.send('ok')
        /*res.redirect('/tdb');*/
    }
    else {
        res.send('Ce mot de passe est erronné')
    }
 }
 

