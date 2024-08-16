const express = require('express');
const router = new express.Router();
const homeController = require('../controllers/homeController');
const tdbController = require('../controllers/tdbController');
const userController = require('../controllers/userController');
const {authentification} = require('../middlewares/authentification');


router.get('/',homeController.homepage);
router.post('/login',homeController.login);

router.get('/tdb',authentification, tdbController.tdbpage);


router.post('/user',userController.createuser);
router.get('/user/:id',userController.updateuser);
router.post('/userupdated/:id',userController.updateuserform);
router.post('/userdeleted/:id',userController.deleteuser);

module.exports = router;