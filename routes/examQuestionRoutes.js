const express = require('express');
const router = express.Router();
const examQuestionController = require('../controllers/examQuestionController');

router.get('/', examQuestionController.getExamQuestions);

module.exports = router;
