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
      res.status(200).json({ message: 'Essay graded successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  async addQuestionToExam(req, res) {
    try {
      const examId = req.params.examId;
      const questionId = req.body.questionId;
      const maxScore = req.body.maxScore;
      await teacherService.addQuestionToExam(examId, questionId, maxScore);
      res.status(200).json({ message: 'Question added to exam successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAllExams(req, res) {
    try {
      const exams = await teacherService.getAllExams();
      res.status(200).json(exams);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getQuestionsByQuestionBankId(req, res) {
    try {
      const { questionBankId } = req.params;
      const questions = await teacherService.getQuestionsByQuestionBankId(questionBankId);
      if (questions) {
        res.status(200).json(questions);
      } else {
        res.status(404).json({ error: 'No questions found for this question bank' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAllQuestionBanks(req, res) {
    try {
      const questionBanks = await teacherService.getAllQuestionBanks();
      res.status(200).json(questionBanks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new TeacherController();