const QuestionBank = require('../models/QuestionBank');
const CriteriaDetail = require('../models/CriteriaDetail');
class GroupLeaderService {
  static async createCriteriaDetail(criteriaDetailData) {
    return await CriteriaDetail.create(criteriaDetailData);
  }
  static async getCriteriaDetailById(detailId) {
    return await CriteriaDetail.getById(detailId);
  }

  static async getCriteriaDetailByQuestionId(questionId) {
    return await CriteriaDetail.getByQuestionId(questionId);
  }

  static async updateCriteriaDetail(detailId, criteriaDetailData) {
    return await CriteriaDetail.update(detailId, criteriaDetailData);
  }

  static async deleteCriteriaDetail(detailId) {
    return await CriteriaDetail.delete(detailId);
  }

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
  async getAllQuestionBanks() {
    return await QuestionBank.getAll();
  }
}

module.exports = new GroupLeaderService();