const questionService = require('../services/QuestionService');

class QuestionController {
  async createQuestion(req, res) {
    try {
      const question = await questionService.createQuestion(req.body);
      res.status(201).json(question);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getQuestionsByBankId (req, res) {
    try {
      const questions = await questionService.getQuestionsByBankId(req.params.bank_id);
      res.success(res, questions);
    } catch (err) {
      res.error(res, err);
    }
  }

  async getQuestionById(req, res) {
    try {
      const question = await questionService.getQuestionById(req.params.id);
      if (question) {
        res.status(200).json(question);
      } else {
        res.status(404).json({ error: 'Question not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  
  async updateQuestion(req, res) {
    try {
      const updatedQuestion = await questionService.updateQuestion(req.params.id, req.body);
      if (updatedQuestion) {
        res.status(200).json(updatedQuestion);
      } else {
        res.status(404).json({ error: 'Question not found' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async deleteQuestion(req, res) {
    try {
      await questionService.deleteQuestion(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

module.exports = new QuestionController();