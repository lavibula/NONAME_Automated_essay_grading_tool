// models/ExamResult.js
const db = require('../config/database');

class ExamResult {
  constructor(resultId, examId, studentId, totalScore) {
    this.resultId = resultId;
    this.examId = examId;
    this.studentId = studentId;
    this.totalScore = totalScore;
  }

  static async create(examResult) {
    const query = `INSERT INTO ExamResult (exam_id, student_id) VALUES ($1, $2) RETURNING "result_id", "exam_id", "student_id", "total_score"`;
    const values = [examResult.examId, examResult.studentId];
    const result = await db.query(query, values);
    return new ExamResult(
      result.rows[0].result_id,
      result.rows[0].exam_id,
      result.rows[0].student_id,
      result.rows[0].total_score
    );
  }

  static async update(resultId, examResult) {
    const query = 'UPDATE ExamResult SET "total_score" = $1 WHERE "result_id" = $2 RETURNING *';
    const values = [examResult.totalScore, resultId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new ExamResult(
        result.rows[0].result_id,
        result.rows[0].exam_id,
        result.rows[0].student_id,
        result.rows[0].total_score
      );
    }
    return null;
  }

  static async getByStudentAndExamId(studentId, examId) {
    const query = `SELECT * FROM ExamResult WHERE "student_id" = $1 AND "exam_id" = $2`;
    const values = [studentId, examId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new ExamResult(
        result.rows[0].result_id,
        result.rows[0].exam_id,
        result.rows[0].student_id,
        result.rows[0].total_score
      );
    }
    return null;
  }
}

module.exports = ExamResult;