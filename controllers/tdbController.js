const User = require('../models/user');

/**
     *Page principal de l'application avec:
     * affichage de l'ensemble des users
     * affichage du nom de l'utilisateur connecté stocké dans les cookies à la connexions
     */
exports.tdbpage = async (req, res) => {
   
    const userConnected = req.cookies.user;
    console.log(userConnected);
    const userslist = await User.find({}).lean();
    

    res.render("tableaubord", {
        title: "Tableau de bord",
        userslist,
        userConnected: userConnected
        
    });
 
 };

