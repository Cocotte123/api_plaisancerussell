const User = require('../models/user');

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

