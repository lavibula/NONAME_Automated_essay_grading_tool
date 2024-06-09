const express = require('express');
const essayController = require('../controllers/essayController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

router.post('/', authMiddleware, essayController.createEssay);
router.get('/:id', authMiddleware, essayController.getEssayById);
router.get('/exams/:id', authMiddleware, essayController.getEssaysByExamId);
router.get('/students/:id', authMiddleware, essayController.getEssaysByStudentId);
router.put('/:id', authMiddleware, essayController.updateEssay);
router.delete('/:id', authMiddleware, essayController.deleteEssay);
router.get('/students/:studentId/exams/:examId', authMiddleware, essayController.getEssaysByStudentAndExamId);

module.exports = router;