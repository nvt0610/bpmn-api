// routes/diagramRoutes.js
const express = require('express');
const path = require('path');
const router = express.Router();
const diagramController = require('../controllers/diagramController');

// Route đặc biệt render HTML editor
router.get('/draw', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/editor.html'));
});

// RESTful routes
router.get('/', diagramController.getAllDiagrams);
router.get('/:id', diagramController.getDiagramById);
router.post('/', diagramController.createDiagram);
router.put('/:id', diagramController.updateDiagram);
router.delete('/:id', diagramController.deleteDiagram);

module.exports = router;
