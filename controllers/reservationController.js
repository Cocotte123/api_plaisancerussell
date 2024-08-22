const Reservation = require('../models/reservation');


    /**
     * Création d'une réservation avec:
     * @typedef {Object} Reservation
     * @property {Number} catwayNumber un numéro de catway renseigné manuellement - pas de vérification de l'existence du catway
     * @property {String} clientName un nom de client en saisie libre
     * @property {String} boatName un nom de bateau en saisie libre
     * @property {Date} checkIn une date d'arrivée
     * @property {Number} checkOut une date de départ 
     */

exports.createreservation = async (req, res) => {

    
    const createReservationForm = new Reservation ({
        catwayNumber : req.body.catwayNumber,
        clientName : req.body.clientName,
        boatName : req.body.boatName,
        checkIn : req.body.checkIn,
        checkOut : req.body.checkOut,
    });

    console.log(createReservationForm);
    await createReservationForm.save();

    /**
     * exemple de création multiple
     */
    /*try {
        await Reservation.insertMany(
            [{
                "catwayNumber": 1,
                "clientName": "Thomas Martin",
                "boatName": "Carolina",
                "checkIn": "2022-05-21T06:00:00Z",
                "checkOut": "2022-10-27T06:00:00Z"
            },
            {
                "catwayNumber": 2,
                "clientName": "John Doe",
                "boatName": "Groeland",
                "checkIn": "2022-05-18T06:00:00Z",
                "checkOut": "2022-11-30T06:00:00Z"
            },
            
        ]
    );
    res.redirect('/tdb');
    }catch (error) {
        console.log(error);
    }*/
    res.status(200);
    res.redirect('/tdb#reservations');

 
 }
/**
     * Affichage de l'ensemble des réservations:
     */
 
 exports.reservationlistpage = async (req, res) => {
    const reservationslist = await Reservation.find({}).lean();

    res.render("reservationlist", {
        title: "Liste des réservations",
        reservationslist,
        
    });
    res.status(200);
 }
 /**
     * Affichage des détails d'une réservation à partir de l'id issu de la collection Catway et de la ligne sélectionnée:
     */

 exports.detailreservation = async (req, res) => {
    const id = req.params.id;
       
   
    console.log(id);
    const reservationdetail = await Reservation.findOne({_id: id}).lean();
    res.render("detailreservation", {
             title: "Détail d'une réservation",
             reservationdetail
         });
    res.status(200);
    
    
    
 }
 /**
     * Suppression d'une réservation à partir de son id issu de la ligne sélectionnée:
     */
 
 exports.deletereservation = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    
    await Reservation.deleteOne({_id: id});
    res.status(200);
    res.redirect('/reservation/list');
 }