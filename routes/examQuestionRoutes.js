const express = require('express');
const router = express.Router();
const examQuestionController = require('../controllers/examQuestionController');

router.get('/', examQuestionController.getExamQuestions);
router.get('/:id', examQuestionController.getExamQuestionsById);
router.post('/exams', examQuestionController.createExam);
router.put('/exams/:exam_id', examQuestionController.updateExam);
router.delete('/exams/:exam_id', examQuestionController.deleteExam);

module.exports = router;
