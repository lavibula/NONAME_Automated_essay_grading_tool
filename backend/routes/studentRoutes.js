const express = require('express');
const studentController = require('../controllers/studentController');
const authMiddleware = require('../utils/auth');
const Enrollment = require('../models/Enrollment');


const router = express.Router();

router.post('/students/enroll', authMiddleware, studentController.enrollStudent); //hàm dùng để tham gia Exam (truyền body examId)
router.post('/students/essays', authMiddleware, studentController.submitEssay); // hàm dùng để submit bài thi (truyền body examquestionId, essayContent)
router.get('/students/exams/:id/results', authMiddleware, studentController.getExamResults); //hàm dùng get result by exam (truyền param là examId)
router.get('/students/exams', authMiddleware, studentController.getAllExams); // get all exams that student join
router.get('/students/exams/unsubmitted', authMiddleware, studentController.getUnsubmittedExams); // get all exam that student doesn't submissions any questions
module.exports = router;