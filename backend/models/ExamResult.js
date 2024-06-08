const db = require('../database/db');

class ExamResult {
  constructor(resultId, essayId, gradedBy, score, gradedTime) {
    this.result_id = resultId;
    this.essay_id = essayId;
    this.graded_by = gradedBy;
    this.score = score;
    this.graded_time = gradedTime;
  }

  static async create(examResult) {
    const query = 'INSERT INTO ExamResult (result_id, essay_id, graded_by, score, graded_time) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [examResult.result_id, examResult.essay_id, examResult.graded_by, examResult.score, examResult.graded_time];
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
    const query = 'SELECT * FROM ExamResult WHERE result_id = $1';
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

  static async getByEssayId(essayId) {
    const query = 'SELECT * FROM ExamResult WHERE essay_id = $1';
    const values = [essayId];
    const result = await db.query(query, values);
    return result.rows.map(row => new ExamResult(
      row.result_id,
      row.essay_id,
      row.graded_by,
      row.score,
      row.graded_time
    ));
  }

  static async update(resultId, examResult) {
    const query = 'UPDATE ExamResult SET essay_id = $1, graded_by = $2, score = $3, graded_time = $4 WHERE result_id = $5 RETURNING *';
    const values = [examResult.essay_id, examResult.graded_by, examResult.score, examResult.graded_time, resultId];
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

  static async delete(resultId) {
    const query = 'DELETE FROM ExamResult WHERE result_id = $1';
    const values = [resultId];
    await db.query(query, values);
  }
}

module.exports = ExamResult;