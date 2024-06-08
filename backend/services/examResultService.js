const ExamResult = require('../models/ExamResult');
const Essay = require('../models/Essay');
const EssayService = require('./essayService'); 

class ExamResultService {
  async createExamResult(examResultData) {
    // Validate if essay_id exists in Essay table
    const essayExists = await Essay.getById(examResultData.essay_id);
    if (!essayExists) {
      throw new Error('Invalid essay ID');
    }
    return await ExamResult.create(examResultData);
  }

  async getExamResultById(resultId) {
    return await ExamResult.getById(resultId);
  }

  async getExamResultsByEssayId(essayId) {
    return await ExamResult.getByEssayId(essayId);
  }

  async updateExamResult(resultId, examResultData) {
    // Validate if essay_id exists in Essay table
    const essayExists = await Essay.getById(examResultData.essay_id);
    if (!essayExists) {
      throw new Error('Invalid essay ID');
    }
    return await ExamResult.update(resultId, examResultData);
  }

  async deleteExamResult(resultId) {
    await ExamResult.delete(resultId);
  }

  async calculateOverallScore(essayId) {
    const examResults = await this.getExamResultsByEssayId(essayId);
    if (examResults.length > 0) {
      return examResults[0].score;
    }
    return null;
  }

  async getExamResultDetails(essayId) {
    const examResults = await this.getExamResultsByEssayId(essayId);
    const essay = await Essay.getById(essayId);
    if (examResults.length > 0) {
      return {
        examResult: examResults[0],
        essay: essay
      };
    }
    return null;
  }
}

module.exports = new ExamResultService();