const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController')


router.post('/createPolicy',policyController.createPolicy )
router.get('/getPolicy',policyController.getPolicy )
router.get('/getPolicy/:id',policyController.getSinglePolicy )
router.delete('/deletePolicy/:id', policyController.deletePolicy)
router.patch('/updatePolicy/:id', policyController.updatePolicy)

module.exports = router;