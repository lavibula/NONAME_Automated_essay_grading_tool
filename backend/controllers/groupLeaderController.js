const groupLeaderService = require('../services/groupLeaderService');
const authMiddleware = require('../utils/auth');

class GroupLeaderController {
  async createQuestionBank(req, res) {
    try {
      const questionBank = await groupLeaderService.createQuestionBank(req.body);
      res.status(201).json(questionBank);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getQuestionBankById(req, res) {
    try {
      const questionBank = await groupLeaderService.getQuestionBankById(req.params.id);
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
      const updatedQuestionBank = await groupLeaderService.updateQuestionBank(req.params.id, req.body);
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
      await groupLeaderService.deleteQuestionBank(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

module.exports = new GroupLeaderController();