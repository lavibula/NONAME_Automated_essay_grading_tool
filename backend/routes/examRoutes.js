const express = require('express');
const examController = require('../controllers/ExamController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

router.post('/', examController.createExam);
router.get('/:id', examController.getExamById);
router.get('/', examController.getExamByName);
router.put('/:id', examController.updateExam);
router.delete('/:id', examController.deleteExam);
router.put('/:id/activate', examController.activateExam);
router.put('/:id/deactivate', examController.deactivateExam);
router.get('/user/:user_id', authMiddleware, examController.getExamsByCreated);
module.exports = router;