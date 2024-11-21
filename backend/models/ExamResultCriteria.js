const db = require('../config/database');

class ExamResultCriteria {
  constructor(resultCriteriaId, essayId, detailId, score) {
    this.resultCriteriaId = resultCriteriaId;
    this.essayId = essayId;
    this.detailId = detailId;
    this.score = score;
  }

  static async create(examResultCriteria) {
    const query = `INSERT INTO ExamResultCriteria (essay_id, detail_id) VALUES ($1, $2) RETURNING "result_criteria_id", "essay_id", "detail_id"`;
    const values = [examResultCriteria.essayId, examResultCriteria.detailId];
    const result = await db.query(query, values);
    return new ExamResultCriteria(
      result.rows[0].result_criteria_id,
      result.rows[0].essay_id,
      result.rows[0].detail_id
    );
  }

  static async getById(resultCriteriaId) {
    const query = 'SELECT * FROM ExamResultCriteria WHERE "result_criteria_id" = $1';
    const values = [resultCriteriaId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new ExamResultCriteria(
        result.rows[0].result_criteria_id,
        result.rows[0].essay_id,
        result.rows[0].detail_id,
        result.rows[0].score
      );
    }
    return null;
  }

  static async getByResultId(essayId) {
    const query = 'SELECT * FROM ExamResultCriteria WHERE "essay_id" = $1';
    const values = [essayId];
    const result = await db.query(query, values);
    return result.rows.map(row => new ExamResultCriteria(
      row.result_criteria_id,
      row.essay_id,
      row.detail_id,
      row.score
    ));
  }

  static async update(resultCriteriaId, examResultCriteria) {
    const query = `UPDATE ExamResultCriteria SET score = $1 WHERE result_criteria_id = $2 RETURNING *`;
    const values = [examResultCriteria.score, resultCriteriaId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new ExamResultCriteria(
        result.rows[0].result_criteria_id,
        result.rows[0].essay_id,
        result.rows[0].detail_id,
        result.rows[0].score
      );
    }
    return null;
  }
}

module.exports = ExamResultCriteria;
