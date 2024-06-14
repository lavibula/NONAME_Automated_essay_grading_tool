const Exam = require('../models/Exam');

class ExamService {
  async createExam(examData, userId) {
    const exam = {
      ...examData,
      createdBy: userId // Set createdBy from the authenticated user
    };
    return await Exam.create(exam);
  }

  async getExamById(id) {
    return await Exam.getById(id);
  }

  async deleteExam(id, userId) {
    const existingExam = await Exam.getById(id);
    if (!existingExam || existingExam.createdBy !== userId) {
      throw new Error('You do not have permission to delete this exam');
    }
    await Exam.delete(id);
  }
  async calculateScoreForEssay(essayId) {
    const score = await Exam.calculateScore(essayId);
    return score;
  }
}

module.exports = new ExamService();