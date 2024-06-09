const express = require('express');
const examController = require('../controllers/examController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

router.post('/', authMiddleware, examController.createExam);
router.get('/:id', authMiddleware, examController.getExamById);
router.put('/:id', authMiddleware, examController.updateExam);
router.delete('/:id', authMiddleware, examController.deleteExam);

module.exports = router;