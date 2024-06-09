const ExamResultCriteria = require('../models/ExamResultCriteria');

class ExamResultCriteriaService {
  async createExamResultCriteria(examResultCriteriaData) {
    return await ExamResultCriteria.create(examResultCriteriaData);
  }

  async getExamResultCriteriaById(resultCriteriaId) {
    return await ExamResultCriteria.getById(resultCriteriaId);
  }

  async getExamResultCriteriasByResultId(resultId) {
    return await ExamResultCriteria.getByResultId(resultId);
  }

  async updateExamResultCriteria(resultCriteriaId, examResultCriteriaData) {
    return await ExamResultCriteria.update(resultCriteriaId, examResultCriteriaData);
  }

  async deleteExamResultCriteria(resultCriteriaId) {
    await ExamResultCriteria.delete(resultCriteriaId);
  }
}

module.exports = new ExamResultCriteriaService();