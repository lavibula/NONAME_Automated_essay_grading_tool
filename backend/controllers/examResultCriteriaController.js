const examResultCriteriaService = require('../services/examResultCriteriaService');
const authMiddleware = require('../utils/auth');

class ExamResultCriteriaController {
  async createExamResultCriteria(req, res) {
    try {
      const examResultCriteria = await examResultCriteriaService.createExamResultCriteria(req.body);
      res.status(201).json(examResultCriteria);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getExamResultCriteriaById(req, res) {
    try {
      const examResultCriteria = await examResultCriteriaService.getExamResultCriteriaById(req.params.id);
      if (examResultCriteria) {
        res.status(200).json(examResultCriteria);
      } else {
        res.status(404).json({ error: 'Exam result criteria not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getExamResultCriteriasByResultId(req, res) {
    try {
      const examResultCriterias = await examResultCriteriaService.getExamResultCriteriasByResultId(req.params.id);
      res.status(200).json(examResultCriterias);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateExamResultCriteria(req, res) {
    try {
      const updatedExamResultCriteria = await examResultCriteriaService.updateExamResultCriteria(req.params.id, req.body);
      if (updatedExamResultCriteria) {
        res.status(200).json(updatedExamResultCriteria);
      } else {
        res.status(404).json({ error: 'Exam result criteria not found' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async deleteExamResultCriteria(req, res) {
    try {
      await examResultCriteriaService.deleteExamResultCriteria(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

module.exports = new ExamResultCriteriaController();