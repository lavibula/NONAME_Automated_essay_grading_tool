const express = require('express');
const studentController = require('../controllers/studentController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

router.post('/essays/:question_id', studentController.submitEssay);
// router.post('/essays', authMiddleware, studentController.submitEssay);
router.get('/exams/:id/results', authMiddleware, studentController.getExamResults);
router.get('/mylibrary/:exam_id',studentController.attendexam);
router.get('/mylibrary',studentController.mylibrarystudent);

module.exports = router;