const mongoose = require('mongoose');


const Catway = mongoose.model('Catway',{
    catwayNumber: {
        type: Number,
        required: true,

    },
    type: {
        type: String,
        required: true,
    },
    catwayState: {
        type: String,
        required: true,
    }
    

});

module.exports = Catway;