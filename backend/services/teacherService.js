const Teacher = require('../models/Teacher');

class TeacherService {
  async createExam(examData) {
    return await Teacher.createExam(examData);
  }

  async getExamById(examId) {
    return await Teacher.getExamById(examId);
  }

  async deleteExam(examId) {
    await Teacher.deleteExam(examId);
  }

  async gradeScore(examId, studentId) {
    return await Teacher.gradeScore(examId, studentId);
  }

  async addQuestionToExam(examId, questionId, maxScore){
    return await Teacher.addQuestionToExam(examId, questionId, maxScore);
  }
}

module.exports = new TeacherService();