const express = require('express');
const studentController = require('../controllers/studentController');
const authMiddleware = require('../utils/auth');
const Enrollment = require('../models/Enrollment');


const router = express.Router();

router.post('/students/enroll', authMiddleware, studentController.enrollStudent);
router.post('/students/essays', authMiddleware, studentController.submitEssay);
router.get('/students/exams/:id/results', authMiddleware, studentController.getExamResults);
router.get('/students/exams', authMiddleware, studentController.getAllExams);
router.get('/students/exams/unsubmitted', authMiddleware, studentController.getUnsubmittedExams); 
module.exports = router;