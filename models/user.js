const mongoose = require('mongoose');


const User = mongoose.model('User',{
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now()
    }    ,
    updated: {
        type: Date,
        default: Date.now()
    }
    

});

module.exports = User;