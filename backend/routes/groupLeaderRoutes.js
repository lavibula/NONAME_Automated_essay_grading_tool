const express = require('express');
const groupLeaderController = require('../controllers/groupLeaderController');
const authMiddleware = require('../utils/auth');

const router = express.Router();
router.get('/mylibraryleader',groupLeaderController.mylibrarypublic);
router.get('/createquestion',groupLeaderController.createquestion);
router.post('/group-leaders/question-banks', authMiddleware, groupLeaderController.createQuestionBank);
router.get('/group-leaders/question-banks/:id', authMiddleware, groupLeaderController.getQuestionBankById);
router.put('/group-leaders/question-banks/:id', authMiddleware, groupLeaderController.updateQuestionBank);
router.delete('/group-leaders/question-banks/:id', authMiddleware, groupLeaderController.deleteQuestionBank);
router.get('/group-leaders/question-banks', authMiddleware, groupLeaderController.getAllQuestionBanks);

module.exports = router;