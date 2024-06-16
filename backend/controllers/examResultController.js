const examResultService = require('../services/examResultService');
const authMiddleware = require('../utils/auth');

class ExamResultController {
  async createExamResult(req, res) {
    try {
      const examResult = await examResultService.createExamResult(req.body);
      res.status(201).json(examResult);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getExamResultById(req, res) {
    try {
      const examResult = await examResultService.getExamResultById(req.params.id);
      if (examResult) {
        res.status(200).json(examResult);
      } else {
        res.status(404).json({ error: 'Exam result not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getExamResultsByEssayId(req, res) {
    try {
      const examResults = await examResultService.getExamResultsByEssayId(req.params.id);
      res.status(200).json(examResults);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateExamResult(req, res) {
    try {
      const updatedExamResult = await examResultService.updateExamResult(req.params.id, req.body);
      if (updatedExamResult) {
        res.status(200).json(updatedExamResult);
      } else {
        res.status(404).json({ error: 'Exam result not found' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async deleteExamResult(req, res) {
    try {
      await examResultService.deleteExamResult(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async calculateOverallScore(req, res) {
    try {
      const score = await examResultService.calculateOverallScore(req.params.id);
      res.status(200).json({ score });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getExamResultDetails(req, res) {
    try {
      const resultDetails = await examResultService.getExamResultDetails(req.params.id);
      if (resultDetails) {
        res.status(200).json(resultDetails);
      } else {
        res.status(404).json({ error: 'Exam result details not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new ExamResultController();