const express = require('express');
const essaysController = require('../controllers/essayController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

router.post('/', authMiddleware, essaysController.createEssay);
router.get('/:essay_id', authMiddleware, essaysController.getEssayById);
router.get('/exam/:exam_id', authMiddleware, essaysController.getEssaysByExamId);
router.get('/student/:student_id', authMiddleware, essaysController.getEssaysByStudentId);
router.put('/:essay_id', authMiddleware, essaysController.updateEssay);
router.delete('/:essay_id', authMiddleware, essaysController.deleteEssay);
router.post('/:essay_id/score', authMiddleware, essaysController.calculateScore);
router.get('/student/:student_id/exam/:exam_id', authMiddleware, essaysController.getEssaysByStudentAndExamId);

module.exports = router;