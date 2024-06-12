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

  async gradeEssay(req, res) {
    try {
      const teacherId = req.user.user_id; // Lấy ID của giáo viên từ token
      const examResult = await teacherService.gradeEssay(req.params.id, teacherId);
      res.status(200).json(examResult);
      res.status(200).json({ message: 'Essay graded successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new TeacherController();