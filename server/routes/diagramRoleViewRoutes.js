const express = require('express');
const router = express.Router();
const controller = require('../controllers/diagramRoleViewController');

router.get('/:diagramId', controller.getRoleViewsByDiagram);
router.post('/', controller.createRoleView);
router.put('/:id', controller.updateRoleView);
router.delete('/:id', controller.deleteRoleView);

module.exports = router;
