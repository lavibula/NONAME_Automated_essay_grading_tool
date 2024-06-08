const express = require('express');
const criteriasController = require('../controllers/criteriaController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

router.get('/', criteriasController.getAllCriterias); // Lấy danh sách các tiêu chí
router.get('/:criteria_id', criteriasController.getCriteriaById); // Lấy thông tin tiêu chí theo ID
router.post('/', criteriasController.createCriteria); // Tạo tiêu chí mới
router.put('/:criteria_id', criteriasController.updateCriteria); // Cập nhật thông tin tiêu chí
router.delete('/:criteria_id', criteriasController.deleteCriteria); // Xóa tiêu chí

module.exports = router;
