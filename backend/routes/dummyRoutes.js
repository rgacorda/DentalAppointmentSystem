const express = require('express');
const router = express.Router();
const dummyController = require('../controllers/dummyController')
const requireAuth = require('../middlewares/userMiddleware')


router.get('/checkAuth',requireAuth, dummyController.dummyPath)

module.exports = router;

// for testing purposes