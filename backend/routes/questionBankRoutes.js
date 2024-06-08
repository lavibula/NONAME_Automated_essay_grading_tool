const express = require('express');
const questionBankController = require('../controllers/QuestionBankController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

router.post('/', questionBankController.createQuestionBank);
router.get('/:id', questionBankController.getQuestionBankById);
router.get('/', questionBankController.getQuestionBankByName);
router.put('/:id', questionBankController.updateQuestionBank);
router.delete('/:id', questionBankController.deleteQuestionBank);
router.get('/user/:user_id', questionBankController.getQuestionBanksByCreated);
module.exports = router;