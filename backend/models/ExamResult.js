const db = require('../config/database');

class ExamResult {
  constructor(resultId, essayId, gradedBy, score, gradedTime) {
    this.resultId = resultId;
    this.essayId = essayId;
    this.gradedBy = gradedBy;
    this.score = score;
    this.gradedTime = gradedTime;
  }

  static async create(examResult) {
    const query =
      `INSERT INTO ExamResult (essay_id, graded_by, score, graded_time) VALUES ($1, $2, $3, $4) 
      RETURNING "result_id", "essay_id", "graded_by", "score", "graded_time"`;
    const values = [
      examResult.essayId,
      examResult.gradedBy,
      examResult.score,
      examResult.gradedTime,
    ];
    const result = await db.query(query, values);
    return new ExamResult(
      result.rows[0].result_id,
      result.rows[0].essay_id,
      result.rows[0].graded_by,
      result.rows[0].score,
      result.rows[0].graded_time
    );
  }

  static async getById(resultId) {
    const query = 'SELECT * FROM ExamResult WHERE "result_id" = $1';
    const values = [resultId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new ExamResult(
        result.rows[0].result_id,
        result.rows[0].essay_id,
        result.rows[0].graded_by,
        result.rows[0].score,
        result.rows[0].graded_time
      );
    }
    return null;
  }

  static async getByStudentAndExamId(studentId, examId) {
    const query =
      `SELECT er.* 
      FROM ExamResult er 
      JOIN Essay e ON er."essay_id" = e."essay_id" 
      WHERE e."student_id" = $1 AND e."exam_id" = $2`;
    const values = [studentId, examId];
    const result = await db.query(query, values);
    return result.rows.map(row => new ExamResult(
      row.result_id,
      row.essay_id,
      row.graded_by,
      row.score,
      row.graded_time
    ));
  }
}

module.exports = ExamResult;