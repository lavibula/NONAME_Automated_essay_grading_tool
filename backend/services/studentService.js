const Student = require('../models/Student');

class StudentService {
  async submitEssay(essayData) {
    return await Student.submitEssay(essayData);
  }

  async getExamResults(studentId, examId) {
    return await Student.getExamResults(studentId, examId);
  }
  async getAllExams(studentId) {
    return await Student.getAllExams(studentId);
  }

  async getUnsubmittedExams(studentId) {
    return await Student.getUnsubmittedExams(studentId);
  }
}

module.exports = new StudentService();