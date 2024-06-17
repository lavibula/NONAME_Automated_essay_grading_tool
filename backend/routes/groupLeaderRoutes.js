const express = require('express');
const groupLeaderController = require('../controllers/groupLeaderController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

router.post('/group-leaders/question-banks', authMiddleware, groupLeaderController.createQuestionBank);
router.get('/group-leaders/question-banks/:id', authMiddleware, groupLeaderController.getQuestionBankById);
router.put('/group-leaders/question-banks/:id', authMiddleware, groupLeaderController.updateQuestionBank);
router.delete('/group-leaders/question-banks/:id', authMiddleware, groupLeaderController.deleteQuestionBank);
router.get('/group-leaders/question-banks', authMiddleware, groupLeaderController.getAllQuestionBanks);
router.post('/group-leaders/createCriteriaDetail', authMiddleware, groupLeaderController.createCriteriaDetail);
router.get('/group-leaders/criteria-details/:detailId', authMiddleware, groupLeaderController.getCriteriaDetailById);
router.get('/group-leaders/criteria-details', authMiddleware, groupLeaderController.getAllCriteriaDetails);
router.put('/group-leaders/criteria-details/:detailId', authMiddleware, groupLeaderController.updateCriteriaDetail);
router.delete('/group-leaders/criteria-details/:detailId', authMiddleware, groupLeaderController.deleteCriteriaDetail);

module.exports = router;