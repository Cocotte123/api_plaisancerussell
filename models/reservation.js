const mongoose = require('mongoose');


const Reservation = mongoose.model('Reservation',{
    catwayNumber: {
        type: Number,
        required: true,

    },
    clientName: {
        type: String,
        required: true,
    },
    boatName: {
        type: String,
        required: true,
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    }
    

});

module.exports = Reservation;