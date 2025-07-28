const express = require('express');
const router = express.Router();
const N8nController = require('../controllers/N8nController');


// router.get('/:workflowId', N8nController.getWorkflow);
router.get('/testcase/:id', N8nController.getTestCaseById);
router.post('/export-workflow', N8nController.export);


module.exports = router;  
     