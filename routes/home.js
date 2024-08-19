const express = require('express');
const router = new express.Router();
const homeController = require('../controllers/homeController');
const tdbController = require('../controllers/tdbController');
const userController = require('../controllers/userController');
const {authentification} = require('../middlewares/authentification');
const catwayController = require('../controllers/catwayController');
const reservationController = require('../controllers/reservationController');

router.get('/',homeController.homepage);
router.post('/login',homeController.login);
router.get('/logout',homeController.logout);

router.get('/tdb',authentification, tdbController.tdbpage);


router.post('/user',authentification, userController.createuser);
router.get('/user/:id',authentification, userController.updateuser);
router.post('/userupdated/:id',authentification, userController.updateuserform);
router.post('/userdeleted/:id',authentification, userController.deleteuser);

router.post('/catway',authentification, catwayController.createcatway);
router.get('/catway/list',authentification, catwayController.catwaylistpage);
router.get('/catway/list/:id',authentification, catwayController.updatecatway);
router.post('/catway/list/catwayupdated/:id',authentification, catwayController.updatecatwayform);
router.post('/catwaydeleted/:id',authentification, catwayController.deletecatway);

router.post('/reservation',authentification, reservationController.createreservation);
router.get('/reservation/list',authentification, reservationController.reservationlistpage);
router.get('/reservation/list/:id',authentification, reservationController.detailreservation);
router.post('/reservationdeleted/:id',authentification, reservationController.deletereservation);

module.exports = router;