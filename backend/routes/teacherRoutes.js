const express = require('express');
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

router.post('/exams', authMiddleware, teacherController.createExam);
router.get('/exams/:id', authMiddleware, teacherController.getExamById);
router.put('/exams/:id', authMiddleware, teacherController.updateExam);
router.delete('/exams/:id', authMiddleware, teacherController.deleteExam);
router.post('/essays/:id/grade', authMiddleware, teacherController.gradeEssay);

module.exports = router;