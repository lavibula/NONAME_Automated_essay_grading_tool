const express = require('express');
const examResultsController = require('../controllers/examResultsController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

router.post('/', authMiddleware, examResultsController.createExamResult);
router.get('/:result_id', authMiddleware, examResultsController.getExamResultById);
router.get('/essay/:essay_id', authMiddleware, examResultsController.getExamResultsByEssayId);
router.put('/:result_id', authMiddleware, examResultsController.updateExamResult);
router.delete('/:result_id', authMiddleware, examResultsController.deleteExamResult);
router.get('/essay/:essay_id/score', authMiddleware, examResultsController.calculateOverallScore);

router.get('/student/:student_id/exam/:exam_id', authMiddleware, examResultsController.getExamResultsByStudentAndExamId);
router.get('/student/:student_id/essay/:essay_id', authMiddleware, examResultsController.getExamResultsByStudentAndEssayId);
router.get('/student/:student_id/exam/:exam_id/details', authMiddleware, examResultsController.getExamResultDetails);

module.exports = router;