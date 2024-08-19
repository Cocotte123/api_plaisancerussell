const Reservation = require('../models/reservation');

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
            {
                "catwayNumber": 3,
                "clientName": "Margareth Wurtz",
                "boatName": "Sirène",
                "checkIn": "2022-06-20T06:00:00Z",
                "checkOut": "2022-08-27T06:00:00Z"
            },
            {
                "catwayNumber": 7,
                "clientName": "Ralph Laurent",
                "boatName": "Surcouf",
                "checkIn": "2022-07-01T06:00:00Z",
                "checkOut": "2022-10-13T06:00:00Z"
            },
            {
                "catwayNumber": 11,
                "clientName": "Jack Sparrow",
                "boatName": "Black perl",
                "checkIn": "2022-08-13T06:00:00Z",
                "checkOut": "2022-09-13T06:00:00Z"
            },
            {
                "catwayNumber": 13,
                "clientName": "Jacky Snow",
                "boatName": "léandra",
                "checkIn": "2022-09-18T06:00:00Z",
                "checkOut": "2022-12-23T06:00:00Z"
            }
        ]
    );
    res.redirect('/tdb');
    }catch (error) {
        console.log(error);
    }*/
    res.redirect('/tdb#reservations');

 
 }

 
 exports.reservationlistpage = async (req, res) => {
    const reservationslist = await Reservation.find({}).lean();

    res.render("reservationlist", {
        title: "Liste des réservations",
        reservationslist,
        
    });
 }

 exports.detailreservation = async (req, res) => {
    const id = req.params.id;
       
   
    console.log(id);
    const reservationdetail = await Reservation.findOne({_id: id}).lean();
    res.render("detailreservation", {
             title: "Détail d'une réservation",
             reservationdetail
         });
    
    
    
 }

 
 exports.deletereservation = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    
    await Reservation.deleteOne({_id: id});

    res.redirect('/reservation/list');
 }