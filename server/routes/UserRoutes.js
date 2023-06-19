const express = require('express');
const multer = require('multer');
const router = express.Router();


const userController = require('../controllers/UsersController');


router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

module.exports = router;