const Student = require('../models/Student');

class StudentService {
  async submitEssay(essayData) {
    return await Student.submitEssay(essayData);
  }

  async getExamResults(studentId, examId) {
    return await Student.getExamResults(studentId, examId);
  }
}

module.exports = new StudentService();