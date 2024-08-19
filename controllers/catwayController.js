const Catway = require('../models/catway');

exports.createcatway = async (req, res) => {

    
    const createCatwayForm = new Catway ({
        catwayNumber : req.body.catwayNumber,
        type : req.body.type,
        catwayState : req.body.catwayState,
    });

    console.log(createCatwayForm);
    await createCatwayForm.save();
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
            {
                "catwayNumber": 23,
                "type": "short",
                "catwayState": "La bite d'amarrage est légèrement désolidarisée"
            },
            {
                "catwayNumber": 24,
                "type": "short",
                "catwayState": "bon état"
            },
            {
                "catwayNumber": 25,
                "type": "long",
                "catwayState": "bon état"
            },
            {
                "catwayNumber": 26,
                "type": "short",
                "catwayState": "bon état"
            },
            {
                "catwayNumber": 27,
                "type": "short",
                "catwayState": "bon état"
            },
            {
                "catwayNumber": 28,
                "type": "short",
                "catwayState": "En cours de réparation. Ne peut être réservée actuellement"
            },
            {
                "catwayNumber": 29,
                "type": "short",
                "catwayState": "bon état"
            },
            {
                "catwayNumber": 30,
                "type": "long",
                "catwayState": "bon état"
            },
            {
                "catwayNumber": 31,
                "type": "short",
                "catwayState": "bon état"
            },
            {
                "catwayNumber": 32,
                "type": "short",
                "catwayState": "bon état"
            },
            {
                "catwayNumber": 33,
                "type": "short",
                "catwayState": "bon état"
            },
            {
                "catwayNumber": 34,
                "type": "short",
                "catwayState": "bon état"
            },
            {
                "catwayNumber": 35,
                "type": "long",
                "catwayState": "Plusieurs grandes tâches de peinture bleue sur le ponton"
            }
        ]
    );
    res.redirect('/tdb');
    }catch (error) {
        console.log(error);
    }*/
    res.redirect('/tdb');

 
 }

 exports.catwaylistpage = async (req, res) => {
    const catwayslist = await Catway.find({}).lean();

    res.render("catwaylist", {
        title: "Liste des catways",
        catwayslist,
        /*userConnectedDetail: userConnectedDetail.name*/
    });
 }

 exports.deletecatway = async (req, res) => {
    const id = req.params.id;
    await Catway.findOneAndDelete({}).where(id).lean();
   
    
    res.redirect('/catway/list');
 }