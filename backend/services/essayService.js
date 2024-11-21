const Essay = require('../models/Essay');
const ExamResult = require('../models/ExamResult');

class EssayService {
  async createEssay(essayData) {
    return await Essay.create(essayData);
  }

  async getEssayById(essayId) {
    return await Essay.getById(essayId);
  }

  async getEssaysByExamId(examId) {
    return await Essay.getByExamId(examId);
  }

  async getEssaysByStudentId(studentId) {
    return await Essay.getByStudentId(studentId);
  }

  async updateEssay(essayId, essayData) {
    return await Essay.update(essayId, essayData);
  }

  async deleteEssay(essayId) {
    await Essay.delete(essayId);
  }

  async getEssaysByStudentAndExamId(studentId, examId) {
    return await Essay.getByStudentAndExamId(studentId, examId);
  }
}

module.exports = new EssayService();