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
    },
    authToken: {
        type: String,
        required: true,
    }
    

});
/*
User.methods.generateAuthTokenAndSaveUser = async function() {
    const authToken = jwt.sign({_id: this._id.toString()},"klepr9999-oo'kk");
    this.authTokens.push(authToken);
    await this.save();
    return authToken;
};
*/
module.exports = User;