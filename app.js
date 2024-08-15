require('dotenv').config({ path:"./.env"});

const express = require('express');

const app = express();
const port = 8001; /*|| process.env.PORT*/

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//statuc files
const path = require('path');
app.use(express.static(path.join(__dirname, "public")));
/*app.use(express.static(path.join(__dirname, "views")));*/

//templates engine
const {engine} = require('express-handlebars');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "views"));

//mongodb
const { connectDb} = require('./services/db');
connectDb().catch(err => console.log(err));

const bcrypt = require('bcrypt');
const User = require('./models/user');
/*const { title } = require('process');*/


//Routes
app.use('/', require('./routes/home'));
/*app.use('/tdb', require('./routes/user'));*/


/*
app.post('/tdb', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    const createUserForm = new User ({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword,
    });

    console.log(createUserForm);
    await createUserForm.save();
    res.redirect('/tdb');
})*/

app.use((req,res)=>{
    res.status(404);
    res.send('<h1>page non trouvée</h1>')
})

app.listen(port, () => console.log("Le serveur démarre au port:" + port));