const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/user/userId', userController.allowIfLoggedin, userController.getUser);

router.get('/profile',  userController.grantAccess('readAny', 'profile'), userController.getProfile);

router.get('/home', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'),)

router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);

router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

module.exports = router;