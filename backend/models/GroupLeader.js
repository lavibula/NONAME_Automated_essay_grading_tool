const User = require('./User');
const QuestionBank = require('./QuestionBank');

class GroupLeader extends User {
  static async createQuestionBank(questionBankData) {
    return await QuestionBank.create(questionBankData);
  }

  static async getQuestionBankById(bankId) {
    return await QuestionBank.getById(bankId);
  }

  static async updateQuestionBank(bankId, questionBankData) {
    return await QuestionBank.update(bankId, questionBankData);
  }

  static async deleteQuestionBank(bankId) {
    await QuestionBank.delete(bankId);
  }
}

module.exports = GroupLeader;