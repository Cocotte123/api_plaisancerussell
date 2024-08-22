const chai = require('chai');
/*const should = chai.should();*/
const chaiHttp = require('chai-http');
const catwayController = require('../controllers/catwayController');
const Catway = require('../models/catway');
const router = require('../routes/home');
const jwt = require('jsonwebtoken');
const {authentification} =  require('../middlewares/authentification');
require('dotenv').config({ path:"../.env"});
const { before } = require('mocha');


chai.should();
chai.use(chaiHttp);


const user = {
    email: 'tintin@gmail.com', 
    password: '123456'
  }

  /**
     *Les tests fonctionnent si on enlève le middleware authentification dans les routes
     */


describe ('tests des fonctions relatifs aux catways', ()=>{
    
    /*before ('login', function(done) {
        chai.request(router)
            .post('/login')
            .send(user)
            .end((err, res) => {
                token = res.body.token;
                token = res.body.token;
                res.should.have.status(200);
            },
            done() )
    })*/

    describe("/catway/list", () => {
    /**
     * Afficher la liste des catways
     */
    it('test catwaylistpage', function (done) {
        
            const nbCatwayDb = Catway.estimatedDocumentCount();
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmMzNDVhZTY2ZTFiZGJhYjljYmVkZTAiLCJpYXQiOjE3MjQzMTIxMDN9.QM1llnDhK1pfPY0Gg0uLwSyNTR_Y0cMACK4jdvjdl8c'
            chai.request(router)
            .get('/catway/list')
            .set({Authorization: token})
            /*.set({ Authorization: `Bearer ${token}` })*/
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.length.should.be.equal(nbCatwayDb)
            },
            done()        
        )
    })})


    describe("/catway", () => {
    /**
     * Ajouter un catway
     */
    it('test createcatway', function (done) {
        /*const maxId = await Catway.find().sort({_id: -1}).limit(1);*/
        const catway = {
            catwayNumber : 999,
            type : 'short',
            catwayState : 'test',
        }
        chai.request(router)
        .post('/catway')
        .send(catway)
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.have.property('catwayNumber').equal('999');
        },
        done()
        )   
    })})


    describe("/catway/list/details", () => {
    /**
     * Afficher les détails d'un catway par id
     */
    it('test catwaydetail', function (done) {
        /*const catwayId = '66c32320cd01810db664153c';*/
        const catwayId = Catway.find().sort({_id: -1}).limit(1);
        chai.request(router)
        .get('/catway/list/details/'+catwayId)
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.have.property('type').equal('short');
        },
        done()
        )   
    })})

    describe("/catway/list/catwayupdated/", () => {
    /**
     * Modifier l'état d'un catway by id
     */
    it('test updatecatwayform', function (done) {
        const catwayId = Catway.find().sort({_id: -1}).limit(1);
        const catway = {
            catwayState : 'test modif',
        }
        chai.request(router)
        .post('/catway/list/catwayupdated/'+catwayId)
        .send(catway)
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.have.property('catwayState').equal('test modif');
        },
        done()
        )   

    })})


    describe("/catwaydeleted/", () => {
    /**
     * Supprimer un catway
     */
    it('test deletecatway', function (done) {
        const catwayId = Catway.find().sort({_id: -1}).limit(1);
        chai.request(router)
        .post('/catwaydeleted/'+catwayId)
        .end((err, res) =>{
            res.should.have.status(200);
        },
        done()
        )   

    })})
})
