const express = require('express');
const groupLeaderController = require('../controllers/groupLeaderController');
const authMiddleware = require('../utils/auth');

const router = express.Router();
router.get('/mylibraryleader',groupLeaderController.mylibrarypublic);
router.get('/createquestion',groupLeaderController.createquestion);
router.post('/question-banks', authMiddleware, groupLeaderController.createQuestionBank);
router.get('/question-banks/:id', authMiddleware, groupLeaderController.getQuestionBankById);
router.put('/question-banks/:id', authMiddleware, groupLeaderController.updateQuestionBank);
router.delete('/question-banks/:id', authMiddleware, groupLeaderController.deleteQuestionBank);

module.exports = router;