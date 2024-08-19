const express = require('express');
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const Service = require('../models/Services');


router.post('/createService', serviceController.createService);
router.get('/getServices', serviceController.getServices);
router.get('/getSingleService/:id', serviceController.getSingleService);
router.delete('/:id', serviceController.deleteService);
router.patch('/updateService/:id', serviceController.updateService)


module.exports = router;