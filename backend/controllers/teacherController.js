const teacherService = require('../services/teacherService');
const authMiddleware = require('../utils/auth');

class TeacherController {
  async createExam(req, res) {
    try {
      const exam = await teacherService.createExam(req.body);
      res.status(201).json(exam);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getExamById(req, res) {
    try {
      const exam = await teacherService.getExamById(req.params.id);
      if (exam) {
        res.status(200).json(exam);
      } else {
        res.status(404).json({ error: 'Exam not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateExam(req, res) {
    try {
      const updatedExam = await teacherService.updateExam(req.params.id, req.body);
      if (updatedExam) {
        res.status(200).json(updatedExam);
      } else {
        res.status(404).json({ error: 'Exam not found' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async deleteExam(req, res) {
    try {
      await teacherService.deleteExam(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async gradeScore(req, res) {
    try {
      const examId = req.params.examId;
      const studentId = req.params.studentId;
      const examResult = await teacherService.gradeScore(examId, studentId);
      res.status(200).json(examResult);
      res.status(200).json({ message: 'Essay graded successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new TeacherController();