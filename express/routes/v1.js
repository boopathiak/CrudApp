const express = require('express');
const router = express.Router();

const UserAccountController = require('./../controllers/userAccount');

router.post('/adduser', UserAccountController.addUser);
router.get('/getusers', UserAccountController.getUsers);
router.post('/getuser', UserAccountController.getUser);
router.post('/updateuser', UserAccountController.updateUser);
router.post('/deleteuser', UserAccountController.deleteUser);
router.post('/login', UserAccountController.Login);
module.exports = router;