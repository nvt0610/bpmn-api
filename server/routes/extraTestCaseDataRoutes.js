const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/extraTestCaseDataController');

// ⚠️ Đặt trước: route đặc biệt
router.get('/all/:testCaseId', ctrl.getExtrasByTestCase);   // Lấy toàn bộ extra theo testCaseId
router.get('/role/:testCaseId', ctrl.getExtrasByRole);      // Lấy theo testCaseId + role + nodeId

// CRUD theo role
router.post('/:role', ctrl.createExtra);                    // Tạo extra
router.get('/:role', ctrl.getAllExtraByRole);               // Lấy tất cả extra theo role
router.get('/:role/:id', ctrl.getExtraById);                // Lấy 1 extra theo id
router.put('/:role/:id', ctrl.updateExtra);                 // Cập nhật extra
router.delete('/:role/:id', ctrl.deleteByRole);             // Xóa extra

module.exports = router;
