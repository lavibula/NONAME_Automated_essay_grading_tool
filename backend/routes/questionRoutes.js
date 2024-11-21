const express = require('express');
const questionController = require('../controllers/questionController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

router.post('/', authMiddleware, questionController.createQuestion);
router.get('/:id', authMiddleware, questionController.getQuestionById);
router.put('/:id', authMiddleware, questionController.updateQuestion);
router.delete('/:id', authMiddleware, questionController.deleteQuestion);

module.exports = router;