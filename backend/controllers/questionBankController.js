const questionBankService = require('../services/questionBankService');
const authMiddleware = require('../utils/auth');

class QuestionBankController {
  async createQuestionBank(req, res) {
    try {
      const { userId } = req.user; // Extract userId from the authenticated user
      const questionBank = await questionBankService.createQuestionBank(req.body, userId);
      res.status(201).json(questionBank);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getQuestionBankById(req, res) {
    try {
      const questionBank = await questionBankService.getQuestionBankById(req.params.id);
      if (questionBank) {
        res.status(200).json(questionBank);
      } else {
        res.status(404).json({ error: 'Question bank not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateQuestionBank(req, res) {
    try {
      const updatedQuestionBank = await questionBankService.updateQuestionBank(req.params.id, req.body);
      if (updatedQuestionBank) {
        res.status(200).json(updatedQuestionBank);
      } else {
        res.status(404).json({ error: 'Question bank not found' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async deleteQuestionBank(req, res) {
    try {
      await questionBankService.deleteQuestionBank(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

module.exports = new QuestionBankController();