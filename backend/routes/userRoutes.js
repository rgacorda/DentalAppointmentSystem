const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController') 
const requireAuth = require('../middlewares/userMiddleware')

router.post('/registerUser', userController.registerUser)
router.post('/logout', userController.logoutUser);


module.exports = router;