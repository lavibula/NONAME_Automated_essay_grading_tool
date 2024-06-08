const express = require('express');
const questionsController = require('../controllers/QuestionController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

router.post('/', questionsController.createQuestion);
router.get('/:id', questionsController.getQuestionById);
router.put('/:id', questionsController.updateQuestion);
router.delete('/:id', questionsController.deleteQuestion);
router.get('/bank/:bank_id', authMiddleware, questionsController.getQuestionsByBankId);

module.exports = router;