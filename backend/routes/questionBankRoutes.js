const express = require('express');
const router = express.Router();
const questionBankController = require('../controllers/questionBankController');

router.get('/', questionBankController.getQuestionBanks);
router.get('/:id', questionBankController.getQuestionBankById);
router.post('/', questionBankController.createQuestionBank);
router.put('/:id', questionBankController.updateQuestionBank);
router.delete('/:id', questionBankController.deleteQuestionBank);

module.exports = router;