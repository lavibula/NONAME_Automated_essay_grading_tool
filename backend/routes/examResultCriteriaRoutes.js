const express = require('express');
const examResultCriteriaController = require('../controllers/examResultCriteriaController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

router.post('/', authMiddleware, examResultCriteriaController.createExamResultCriteria);
router.get('/:id', authMiddleware, examResultCriteriaController.getExamResultCriteriaById);
router.get('/results/:id', authMiddleware, examResultCriteriaController.getExamResultCriteriasByResultId);
router.put('/:id', authMiddleware, examResultCriteriaController.updateExamResultCriteria);
router.delete('/:id', authMiddleware, examResultCriteriaController.deleteExamResultCriteria);

module.exports = router;