const bcrypt = require('bcrypt');
const User = require('../models/user');



/**
     *Création de l'utilisateur :
     * @typedef {Object} User
     * @property {String} name nom utilisateur en saisie libre
     * @property {String} email utilisateur en saisie libre avec vérification du format dans le formulaire
     * @property {String} password - mot de passe utilsateur avec cryptage avant enregistrement dans la BDD
     */
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

/**
     *Affichage de la page de modification de l'utilisateur : 
     * tous les champs sont affichés et modifiables
     */

 exports.updateuser = async (req, res) => {
    const id = req.params.id;
       
   
    console.log(id);
    const userdetail = await User.findOne({_id: id}).lean();
    res.render("updateuser", {
             title: "Modification d'un user",
             userdetail
         });
    
    
    
 }

 /**
     *Modification de l'utilisateur à partir de son id issu de la ligne sélectionnée: tous les champs sont possibles
     * ajout d'une date de modification à la date du jour
     */

 exports.updateuserform = async (req, res) => {
    const id = req.params.id;
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    await User.updateOne({_id: id},{
        name: req.body.name,
        email: req.body.email,
        password : hashedPassword,
        updated: Date.now()
    });
   
    
    res.redirect('/tdb');
 }
 /**
     *Suppression de l'utilisateur à partir de son id issu de la ligne sélectionnée:
     */

 exports.deleteuser = async (req, res) => {
    const id = req.params.id;
    await User.deleteOne({_id: id});
   
    
    res.redirect('/tdb');
 }
 
