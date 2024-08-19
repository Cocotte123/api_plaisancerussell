const User = require('../models/user');

exports.tdbpage = async (req, res) => {
   
    const userConnected = req.cookies.id;
    console.log(userConnected);
    const userConnectedDetail = await User.findOne({_id: userConnected}).lean();
    const userslist = await User.find({}).lean();

    res.render("tableaubord", {
        title: "Tableau de bord",
        userslist,
        /*userConnectedDetail: userConnectedDetail.name*/
    });
 
 };

