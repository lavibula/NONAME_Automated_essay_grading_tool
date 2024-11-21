const express = require('express');
const questionBankController = require('../controllers/questionBankController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

router.post('/', authMiddleware, questionBankController.createQuestionBank);
router.get('/:id', authMiddleware, questionBankController.getQuestionBankById);
router.put('/:id', authMiddleware, questionBankController.updateQuestionBank);
router.delete('/:id', authMiddleware, questionBankController.deleteQuestionBank);

module.exports = router;