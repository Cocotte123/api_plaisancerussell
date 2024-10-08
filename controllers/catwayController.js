const Catway = require('../models/catway');

exports.createcatway = async (req, res) => {

    /**
     * Création d'un catway avec:
     * @typedef {Object} Catway
     * @property {Number} catwayNumber -  un numéro renseigné manuellement
     * @property {String} type un type court ou long
     * @property {String} catwayState une description manuelle libre
     */
    const createCatwayForm = new Catway ({
        catwayNumber : req.body.catwayNumber,
        type : req.body.type,
        catwayState : req.body.catwayState,
    });

    console.log(createCatwayForm);
    await createCatwayForm.save();

    /**
     * exemple de création multiple
     */

    /*try {
        await Catway.insertMany(
            [
            {
                "catwayNumber": 21,
                "type": "short",
                "catwayState": "bon état"
            },
            {
                "catwayNumber": 22,
                "type": "short",
                "catwayState": "bon état"
            },
            
        ]
    );
    res.redirect('/tdb');
    }catch (error) {
        console.log(error);
    }*/
    res.status(200);
    res.redirect('/tdb');

 
 }
    /**
     * Affichage de l'ensemble des catways:
     */


 exports.catwaylistpage = async (req, res) => {
    const catwayslist = await Catway.find({}).lean();
    
    res.render("catwaylist", {
        title: "Liste des catways",
        catwayslist,

    });
    res.status(200);

    
 }

    /**
     * Affichage des détails d'un catway à partir de l'id issu de la collection Catway et de la ligne sélectionnée:
     */

  exports.detailcatway = async (req, res) => {
    const id = req.params.id;
       
   
    console.log(id);
    const catwaydetail = await Catway.findOne({_id: id}).lean();
    res.render("detailcatway", {
             title: "Détail d'un catway",
             catwaydetail
         });
    res.status(200);
 }

 /**
     * Suppression d'un catway à partir de son id issu de la ligne sélectionnée:
     */

 exports.deletecatway = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    
    await Catway.deleteOne({_id: id});
    res.status(200);
    res.redirect('/catway/list');
 }

 /**
     * Affichage de la page de modification d'un catway à partir de l'id issu de la collection Catway et de la ligne sélectionnée:
     * uniquement l'état du catway
     */

 exports.updatecatway = async (req, res) => {
    const id = req.params.id;
       
   
    console.log(id);
    const catwaydetail = await Catway.findOne({_id: id}).lean();
    res.render("updatecatway", {
             title: "Modification d'un catway",
             catwaydetail
         });
    
 /**
     * Modification de l'état d'un catway à partir de l'id issu de la collection Catway et de la ligne sélectionnée:
     */   
    
 }

 exports.updatecatwayform = async (req, res) => {
    const id = req.params.id;
    await Catway.updateOne({_id: id},{
        catwayState: req.body.catwayState
    });
   
    res.status(200);
    res.redirect('/catway/list');
 }