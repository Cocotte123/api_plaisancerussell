const bcrypt = require('bcrypt');
const User = require('../models/user');




exports.createuser = async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password,10);
    const createUserForm = new User ({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword,
    });

    console.log(createUserForm);
    await createUserForm.save();
    res.redirect('/tdb');
 
 }


 exports.updateuser = async (req, res) => {
    const id = req.params.id;
       
   
    console.log(id);
    const userdetail = await User.findOne({_id: id}).lean();
    res.render("updateuser", {
             title: "Modification d'un user",
             userdetail
         });
    
    
    
 }

 exports.updateuserform = async (req, res) => {
    const id = req.params.id;
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    await User.findOneAndUpdate({
        name: req.body.name,
        email: req.body.email,
        password : hashedPassword,
        updated: Date.now()
    }).where(id).lean();
   
    
    res.redirect('/tdb');
 }
 

 exports.deleteuser = async (req, res) => {
    const id = req.params.id;
    await User.findOneAndDelete({}).where(id).lean();
   
    
    res.redirect('/tdb');
 }
 
