const express = require('express');
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

router.post('/teachers/exams', authMiddleware, teacherController.createExam);
router.get('/teachers/exams/:id', authMiddleware, teacherController.getExamById);
router.delete('/teachers/exams/:id', authMiddleware, teacherController.deleteExam);
router.post('/teachers/essays/grade-score/:examId/:studentId', authMiddleware, teacherController.gradeScore);
router.post('/teachers/exams/:examId/questions', authMiddleware, teacherController.addQuestionToExam);
router.get('/teachers/exams', authMiddleware, teacherController.getAllExams);
router.get('/teachers/questionBank/:questionBankId/questions', authMiddleware, teacherController.getQuestionsByQuestionBankId); // get all questions from bank_id
router.get('/teachers/questionBanks', authMiddleware, teacherController.getAllQuestionBanks); // get all bank_id
router.get('/teachers/exams-enroll/:id', authMiddleware, teacherController.getAllStudentsByExamId);
router.post('/teachers/exams/grade-all-students/:examId', authMiddleware, teacherController.autoGradeAllStudents); //automatically grade all students by exam_id
router.get('/teachers/exam-results/:examId', authMiddleware, teacherController.getResultByExamId);
router.get('/teachers/student-results/:studentId', authMiddleware, teacherController.getResultByStudentId);
module.exports = router;