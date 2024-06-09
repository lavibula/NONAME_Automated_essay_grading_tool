const Exam = require('../models/Exam');

class ExamService {
  async createExam(exam) {
    return await Exam.create(exam);
  }

  async getExamById(id) {
    return await Exam.getById(id);
  }

  async updateExam(id, exam) {
    // Kiểm tra xem user có quyền sửa đề thi hay không
    const existingExam = await Exam.getById(id);
    if (!existingExam || existingExam.createdBy !== req.user.user_id) { // req.user được truyền từ middleware
      throw new Error('You do not have permission to update this exam');
    }

    return await Exam.update(id, exam);
  }

  async deleteExam(id) {
    await Exam.delete(id);
  }
  async calculateScoreForEssay(essayId) {
    const score = await Exam.calculateScore(essayId);
    return score;
  }
}

module.exports = new ExamService();