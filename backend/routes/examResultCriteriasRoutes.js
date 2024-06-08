const express = require('express');
const examResultCriteriasController = require('../controllers/examResultCriteriasController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

router.post('/', authMiddleware, examResultCriteriasController.createExamResultCriteria);
router.get('/:result_criteria_id', authMiddleware, examResultCriteriasController.getExamResultCriteriaById);
router.get('/result/:result_id', authMiddleware, examResultCriteriasController.getExamResultCriteriasByResultId);
router.put('/:result_criteria_id', authMiddleware, examResultCriteriasController.updateExamResultCriteria);
router.delete('/:result_criteria_id', authMiddleware, examResultCriteriasController.deleteExamResultCriteria);

module.exports = router;