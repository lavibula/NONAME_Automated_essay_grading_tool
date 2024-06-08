const express = require('express');
const examQuestionsController = require('../controllers/examQuestionsController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

router.post('/', authMiddleware, examQuestionsController.createExamQuestion);
router.get('/:examquestion_id', authMiddleware, examQuestionsController.getExamQuestionById);
router.get('/exam/:exam_id', authMiddleware, examQuestionsController.getExamQuestionsByExamId);
router.put('/:examquestion_id', authMiddleware, examQuestionsController.updateExamQuestion);
router.delete('/:examquestion_id', authMiddleware, examQuestionsController.deleteExamQuestion);

module.exports = router;