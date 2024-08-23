const chai = require('chai');
/*const should = chai.should();*/
const chaiHttp = require('chai-http');
const reservationController = require('../controllers/reservationController');
const Reservation = require('../models/reservation');
const router = require('../routes/home');
const jwt = require('jsonwebtoken');
const {authentification} =  require('../middlewares/authentification');
require('dotenv').config({ path:"../.env"});
const { before } = require('mocha');


chai.should();
chai.use(chaiHttp);

describe ('tests des fonctions relatifs aux réservations', ()=>{
    
    describe("/reservation/list", () => {
    /**
     * Afficher la liste des réservations
     */
    it('test reservationlistpage', function (done) {
        
            const nbReservationDb = Reservation.estimatedDocumentCount();
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmMzNDVhZTY2ZTFiZGJhYjljYmVkZTAiLCJpYXQiOjE3MjQzMTIxMDN9.QM1llnDhK1pfPY0Gg0uLwSyNTR_Y0cMACK4jdvjdl8c'
            chai.request(router)
            .get('/reservation/list')
            .set({Authorization: token})
            /*.set({ Authorization: `Bearer ${token}` })*/
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.length.should.be.equal(nbReservationDb)
            },
            done()        
        )
    })})


    describe("/reservation", () => {
    /**
     * Ajouter une réservation
     */
    it('test createreservation', function (done) {
        const reservation = {
            catwayNumber : 4,
            clientName : 'pierrot',
            boatName : 'au clair de la lune',
            checkIn : Date.now(),
            checkOut : Date.now(),
        }
        chai.request(router)
        .post('/reservation')
        .send(reservation)
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.have.property('clientName').equal('pierrot');
        },
        done()
        )   

    })})


    describe("/reservation/list/:id", () => {
    /**
     * Afficher les détails d'une réservation par id
     */
    it('test detailreservation', function (done) {
        /*const reservationId = '66c3530f6c366e1bea9e40b0';*/
        const reservationId = Reservation.find().sort({_id: -1}).limit(1);
        chai.request(router)
        .get('/reservation/list/'+reservationId)
        .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.have.property('clientName').equal('Thomas Martin');
        },
        done()
        )   
    })})

    describe("/reservationdeleted/:id", () => {
    /**
     * Supprimer une réservation
     */
    it('test deletereservation', function (done) {
        const reservationId = Reservation.find().sort({_id: -1}).limit(1);
        chai.request(router)
        .post('/reservationdeleted/'+reservationId)
        .end((err, res) =>{
            res.should.have.status(200);
        },
        done()
        )   

    })})
})


