const QuestionBank = require('../models/QuestionBank');

class QuestionBankService {
  async createQuestionBank(questionBank) {
    return await QuestionBank.create(questionBank);
  }

  async getQuestionBankById(id) {
    return await QuestionBank.getById(id);
  }

  async getQuestionBankByName(name) {
    return await QuestionBank.getByName(name);
  }

  async updateQuestionBank(id, questionBank) {
    return await QuestionBank.update(id, questionBank);
  }

  async deleteQuestionBank(id) {
    await QuestionBank.delete(id);
  }

  async getQuestionBanksByCreated(userId) {
    return await QuestionBank.getByCreated(userId);
  }
}

module.exports = new QuestionBankService();