require('dotenv').config({ path:"./.env"});

const express = require('express');
const cookieparser = require('cookie-parser');

const app = express();
const port = 8001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieparser());

//statuc files
const path = require('path');
app.use(express.static(path.join(__dirname, "public")));


//templates engine
const {engine} = require('express-handlebars');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "views"));

//mongodb
const { connectDb} = require('./services/db');
connectDb().catch(err => console.log(err));

//Routes
app.use('/', require('./routes/home'));
app.use((req,res)=>{
    res.status(404);
    res.send('<h1>page non trouvée</h1>')
});
app.get('/documentation',(req,res)=>{
    res.readFile('./out/index.html');
})


app.listen(port, () => console.log("Le serveur démarre au port:" + port));
