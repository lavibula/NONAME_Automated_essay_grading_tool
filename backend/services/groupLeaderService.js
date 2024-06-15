const QuestionBank = require('../models/QuestionBank');

class GroupLeaderService {
  async createQuestionBank(questionBankData) {
    return await QuestionBank.create(questionBankData);
  }

  async getQuestionBankById(bankId) {
    return await QuestionBank.getById(bankId);
  }

  async updateQuestionBank(bankId, questionBankData) {
    return await QuestionBank.update(bankId, questionBankData);
  }

  async deleteQuestionBank(bankId) {
    await QuestionBank.delete(bankId);
  }
}

module.exports = new GroupLeaderService();