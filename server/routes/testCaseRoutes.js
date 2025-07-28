// routes/testCaseRoutes.js
const express = require('express');
const router = express.Router();
const testCaseController = require('../controllers/testCaseController');

router.get('/', testCaseController.getAllTestCases);
router.get('/:id', testCaseController.getTestCaseById);
router.post('/', testCaseController.createTestCase);
router.delete('/:id', testCaseController.deleteTestCase);
router.patch('/:id', testCaseController.updateTestCase);

module.exports = router;
