const express = require('express');
const examResultController = require('../controllers/examResultController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

router.post('/', authMiddleware, examResultController.createExamResult);
router.get('/:id', authMiddleware, examResultController.getExamResultById);
router.get('/essays/:id', authMiddleware, examResultController.getExamResultsByEssayId);
router.put('/:id', authMiddleware, examResultController.updateExamResult);
router.delete('/:id', authMiddleware, examResultController.deleteExamResult);
router.get('/essays/:id/score', authMiddleware, examResultController.calculateOverallScore);
router.get('/essays/:id/details', authMiddleware, examResultController.getExamResultDetails);

module.exports = router;