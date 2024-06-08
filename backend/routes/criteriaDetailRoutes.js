const express = require('express');
const criteriaDetailsController = require('../controllers/criteriaDetailController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

router.get('/', criteriaDetailsController.getAllCriteriaDetails); // Lấy danh sách các tiêu chí chi tiết
router.get('/:detail_id', criteriaDetailsController.getCriteriaDetailById); // Lấy thông tin tiêu chí chi tiết theo ID
router.post('/', criteriaDetailsController.createCriteriaDetail); // Tạo tiêu chí chi tiết mới
router.put('/:detail_id', criteriaDetailsController.updateCriteriaDetail); // Cập nhật thông tin tiêu chí chi tiết
router.delete('/:detail_id', criteriaDetailsController.deleteCriteriaDetail); // Xóa tiêu chí chi tiết

module.exports = router;