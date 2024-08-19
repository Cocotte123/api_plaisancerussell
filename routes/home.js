const express = require('express');
const router = new express.Router();
const homeController = require('../controllers/homeController');
const tdbController = require('../controllers/tdbController');
const userController = require('../controllers/userController');
const {authentification} = require('../middlewares/authentification');
const catwayController =require('../controllers/catwayController');

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
router.post('/catwaydeleted/:id',authentification, catwayController.deletecatway);

module.exports = router;