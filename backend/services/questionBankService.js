const QuestionBank = require('../models/QuestionBank');

class QuestionBankService {
  async createQuestionBank(questionBank) {
    return await QuestionBank.create(questionBank);
  }

  async getQuestionBankById(id) {
    return await QuestionBank.getById(id);
  }

  async updateQuestionBank(id, questionBank) {
    return await QuestionBank.update(id, questionBank);
  }

  async deleteQuestionBank(id) {
    await QuestionBank.delete(id);
  }
}

module.exports = new QuestionBankService();