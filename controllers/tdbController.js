const User = require('../models/user');

exports.tdbpage = async (req, res) => {

    const userslist = await User.find({}).lean();

    res.render("tableaubord", {
        title: "Tableau de bord",
        userslist
    });
 
 };

