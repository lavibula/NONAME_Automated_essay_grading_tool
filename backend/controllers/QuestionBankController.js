const questionBankService = require('../services/QuestionBankService');

class QuestionBankController {
  async createQuestionBank(req, res) {
    try {
      const questionBank = await questionBankService.createQuestionBank(req.body);
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

  async getQuestionBankByName(req, res) {
    try {
      const name = req.query.name;
      if (name) {
        const questionBank = await questionBankService.getQuestionBankByName(name);
        if (questionBank) {
          res.status(200).json(questionBank);
        } else {
          res.status(404).json({ error: 'Question bank not found' });
        }
      } else {
        res.status(400).json({ error: 'Name is required' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getQuestionBanksByCreated(req, res){
    try {
      const questionBanks = await questionBankService.getQuestionBanksByCreated(req.params.user_id);
      response.success(res, questionBanks);
    } catch (err) {
      response.error(res, err);
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