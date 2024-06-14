const examService = require('../services/examService');
const authMiddleware = require('../utils/auth');

class ExamController {
  async createExam(req, res) {
    try {
      const exam = await examService.createExam(req.body, req.user.user_id);
      res.status(201).json({ message: 'Exam created successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getExamById(req, res) {
    try {
      const exam = await examService.getExamById(req.params.id);
      if (exam) {
        res.status(200).json(exam);
      } else {
        res.status(404).json({ error: 'Exam not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


  async deleteExam(req, res) {
    try {
      await examService.deleteExam(req.params.id, req.user.user_id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

module.exports = new ExamController();