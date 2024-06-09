const db = require('../config/database');

class ExamResultCriteria {
  constructor(resultCriteriaId, resultId, criteriaId) {
    this.resultCriteriaId = resultCriteriaId;
    this.resultId = resultId;
    this.criteriaId = criteriaId;
  }

  static async create(examResultCriteria) {
    const query =
      'INSERT INTO ExamResultCriteria (result_id, criteria_id) VALUES ($1, $2) RETURNING "result_criteria_id", "result_id", "criteria_id"';
    const values = [
      examResultCriteria.resultId,
      examResultCriteria.criteriaId,
    ];
    const result = await db.query(query, values);
    return new ExamResultCriteria(
      result.rows[0].result_criteria_id,
      result.rows[0].result_id,
      result.rows[0].criteria_id
    );
  }
}

module.exports = ExamResultCriteria;