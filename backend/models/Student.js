const User = require('./User');
const Essay = require('./Essay');
const ExamResult = require('./ExamResult');
const db = require('../config/database');

class Student extends User {
  static async submitEssay(essayData) {
    return await Essay.create(essayData);
  }

  static async getExamResults(studentId, examId) {
    return await ExamResult.getByStudentAndExamId(studentId, examId);
  }
  static async getAllExams(studentId) {
    const query = `
      SELECT e.exam_id, e.exam_title, e.description
      FROM Exam e
      INNER JOIN ExamResult er ON e.exam_id = er.exam_id
      WHERE er.student_id = $1
    `;
    const values = [studentId];
    const result = await db.query(query, values);
    return result.rows;
  }

  static async getUnsubmittedExams(studentId) {
    const query = `
      SELECT exam_id, exam_title, description, start_time, end_time
      FROM Exam
      WHERE exam_id IN (SELECT exam_id
      FROM Enrollment
      WHERE student_id = $1 AND has_submitted = FALSE)
    `;
    const values = [studentId];
    const result = await db.query(query, values);
    return result.rows;
  }
}


module.exports = Student;