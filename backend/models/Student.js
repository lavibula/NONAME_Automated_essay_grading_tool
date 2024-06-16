const User = require('./User');
const Essay = require('./Essay');
const ExamResult = require('./ExamResult');

class Student extends User {
  static async submitEssay(essayData) {
    return await Essay.create(essayData);
  }

  static async getExamResults(studentId, examId) {
    return await ExamResult.getByStudentAndExamId(studentId, examId);
  }
}

module.exports = Student;