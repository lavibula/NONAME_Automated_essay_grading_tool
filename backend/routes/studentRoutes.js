const express = require('express');
const studentController = require('../controllers/studentController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

router.post('/essays', authMiddleware, studentController.submitEssay);
router.get('/exams/:id/results', authMiddleware, studentController.getExamResults);
router.get('/mylibrary',studentController.mylibrarystudent);
router.get('/attendexam',studentController.attendexam);

module.exports = router;