const express = require('express');
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../utils/auth');

const router = express.Router();
router.get('/mylibrary/publictest',teacherController.mylibrarypublic);
router.get('/mylibrary/listofgrading',teacherController.mylibrarygrading);
router.get('/createtest',teacherController.createtestui);
router.get('/grading',teacherController.gradingui);
router.post('/exams', authMiddleware, teacherController.createExam);
router.get('/exams/:id', authMiddleware, teacherController.getExamById);
router.delete('/exams/:id', authMiddleware, teacherController.deleteExam);
router.post('/essays/grade-score/:examId/:studentId', authMiddleware, teacherController.gradeScore);
router.post('/exams/:examId/questions', authMiddleware, teacherController.addQuestionToExam);
router.get('/exams', teacherController.getAllExams);
module.exports = router;