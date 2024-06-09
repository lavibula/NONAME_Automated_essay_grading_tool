const Teacher = require('../models/Teacher');

class TeacherService {
  async createExam(examData) {
    return await Teacher.createExam(examData);
  }

  async getExamById(examId) {
    return await Teacher.getExamById(examId);
  }

  async updateExam(examId, examData) {
    return await Teacher.updateExam(examId, examData);
  }

  async deleteExam(examId) {
    await Teacher.deleteExam(examId);
  }

  async gradeEssay(essayId, teacherId, score) {
    return await Teacher.gradeEssay(essayId, teacherId, score);
  }
}

module.exports = new TeacherService();