const db = require('../config/database');

class CriteriaDetail {
  constructor(detailId, questionId, criteriaId, wordCount, phrase, threshold) {
    this.detailId = detailId;
    this.questionId = questionId;
    this.criteriaId = criteriaId;
    this.phrase = phrase;
    this.threshold = threshold;
    this.wordCount = wordCount;
  }

  static async create(examCriteria) {
    const query =
      `INSERT INTO CriteriaDetail (questionId, criteriaId, wordCount, phrase, threshold) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING "detailId", "questionId", "criteriaId", "wordCount", "phrase", "threshold"`;
    const values = [
      examCriteria.questionId,
      examCriteria.criteriaId,
      examCriteria.wordCount,
      examCriteria.phrase,
      examCriteria.threshold
    ];
    const result = await db.query(query, values);
    return new CriteriaDetail(
      result.rows[0].detail_id,
      result.rows[0].question_id,
      result.rows[0].criteria_id,
      result.rows[0].wordCount,
      result.rows[0].phrase,
      result.rows[0].threshold
    );
  }

  static async getById(detailId) {
    const query = 'SELECT * FROM CriteriaDetail WHERE "detail_id" = $1';
    const values = [detailId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new CriteriaDetail(
        result.rows[0].detail_id,
        result.rows[0].question_id,
        result.rows[0].criteria_id,
        result.rows[0].phrase,
        result.rows[0].threshold,
        result.rows[0].wordCount,
      );
    }
    return null;
  }

  static async getByQuestionId(questionId) {
    const query = 'SELECT * FROM CriteriaDetail WHERE "question_id" = $1';
    const values = [questionId];
    const result = await db.query(query, values);
    return result.rows.map(row => new CriteriaDetail(
      row.detail_id,
      row.question_id,
      row.criteria_id,
      row.wordCount,
      row.phrase,
      row.threshold
    ));
  }

  static async update(detailId, criteriaDetail) {
    const query = 'UPDATE CriteriaDetail SET "question_id" = $1, "criteria_id" = $2, "phrase" = $3, "threshold" = $4, "wordCount" = $5 WHERE "detail_id" = $7 RETURNING *';
    const values = [
      criteriaDetail.questionId,
      criteriaDetail.criteriaId,
      criteriaDetail.phrase,
      criteriaDetail.threshold,
      criteriaDetail.wordCount,
      detailId
    ];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new CriteriaDetail(
        result.rows[0].detail_id,
        result.rows[0].question_id,
        result.rows[0].criteria_id,
        result.rows[0].phrase,
        result.rows[0].threshold,
        result.rows[0].wordCount,
      );
    }
    return null;
  }


  static async deleteByQuestionId(questionId) {
    const query = 'DELETE FROM CriteriaDetail WHERE "question_id" = $1';
    const values = [questionId];
    await db.query(query, values);
  }
}

module.exports = CriteriaDetail;