const db = require('../database/db');

class ExamResultCriteria {
  constructor(resultCriteriaId, resultId, criteriaId) {
    this.result_criteria_id = resultCriteriaId;
    this.result_id = resultId;
    this.criteria_id = criteriaId;
  }

  static async create(examResultCriteria) {
    const query = 'INSERT INTO ExamResultCriteria (result_criteria_id, result_id, criteria_id) VALUES ($1, $2, $3) RETURNING *';
    const values = [examResultCriteria.result_criteria_id, examResultCriteria.result_id, examResultCriteria.criteria_id];
    const result = await db.query(query, values);
    return new ExamResultCriteria(
      result.rows[0].result_criteria_id,
      result.rows[0].result_id,
      result.rows[0].criteria_id
    );
  }

  static async getById(resultCriteriaId) {
    const query = 'SELECT * FROM ExamResultCriteria WHERE result_criteria_id = $1';
    const values = [resultCriteriaId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new ExamResultCriteria(
        result.rows[0].result_criteria_id,
        result.rows[0].result_id,
        result.rows[0].criteria_id
      );
    }
    return null;
  }

  static async getByResultId(resultId) {
    const query = 'SELECT * FROM ExamResultCriteria WHERE result_id = $1';
    const values = [resultId];
    const result = await db.query(query, values);
    return result.rows.map(row => new ExamResultCriteria(
      row.result_criteria_id,
      row.result_id,
      row.criteria_id
    ));
  }

  static async update(resultCriteriaId, examResultCriteria) {
    const query = 'UPDATE ExamResultCriteria SET result_id = $1, criteria_id = $2 WHERE result_criteria_id = $3 RETURNING *';
    const values = [examResultCriteria.result_id, examResultCriteria.criteria_id, resultCriteriaId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new ExamResultCriteria(
        result.rows[0].result_criteria_id,
        result.rows[0].result_id,
        result.rows[0].criteria_id
      );
    }
    return null;
  }

  static async delete(resultCriteriaId) {
    const query = 'DELETE FROM ExamResultCriteria WHERE result_criteria_id = $1';
    const values = [resultCriteriaId];
    await db.query(query, values);
  }
}

module.exports = ExamResultCriteria;