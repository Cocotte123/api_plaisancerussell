require('dotenv').config({ path:"../.env"});
const mongoose = require('mongoose');


/*connectDb().catch(err => console.log(err));*/

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGODB)
        .then(() => {
            console.log('connection ok');
        }) 
    } catch (error) {
            console.log(error);
            throw error;
        }  
}

module.exports = {
    connectDb
}