const jwt = require('jsonwebtoken');
const User = require('../models/user');

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