const db = require('../database/db');

class CriteriaDetail {
  constructor(detailId, questionId, criteriaId, wordcount, phrase, threshold) {
    this.detail_id = detailId;
    this.question_id = questionId;
    this.criteria_id = criteriaId;
    this.wordcount = wordcount;
    this.phrase = phrase;
    this.threshold = threshold;
  }

  static async create(criteriaDetail) {
    const query = 'INSERT INTO CriteriaDetail (detail_id, question_id, criteria_id, wordcount, phrase, threshold) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [criteriaDetail.detail_id, criteriaDetail.question_id, criteriaDetail.criteria_id, criteriaDetail.wordcount, criteriaDetail.phrase, criteriaDetail.threshold];
    const result = await db.query(query, values);
    return new CriteriaDetail(
      result.rows[0].detail_id,
      result.rows[0].question_id,
      result.rows[0].criteria_id,
      result.rows[0].wordcount,
      result.rows[0].phrase,
      result.rows[0].threshold
    );
  }

  static async getById(detailId) {
    const query = 'SELECT * FROM CriteriaDetail WHERE detail_id = $1';
    const values = [detailId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new CriteriaDetail(
        result.rows[0].detail_id,
        result.rows[0].question_id,
        result.rows[0].criteria_id,
        result.rows[0].wordcount,
        result.rows[0].phrase,
        result.rows[0].threshold
      );
    }
    return null;
  }

  static async getByQuestionId(questionId) {
    const query = 'SELECT * FROM CriteriaDetail WHERE question_id = $1';
    const values = [questionId];
    const result = await db.query(query, values);
    return result.rows.map(row => new CriteriaDetail(
      row.detail_id,
      row.question_id,
      row.criteria_id,
      row.wordcount,
      row.phrase,
      row.threshold
    ));
  }

  static async update(detailId, criteriaDetail) {
    const query = 'UPDATE CriteriaDetail SET question_id = $1, criteria_id = $2, wordcount = $3, phrase = $4, threshold = $5 WHERE detail_id = $6 RETURNING *';
    const values = [criteriaDetail.question_id, criteriaDetail.criteria_id, criteriaDetail.wordcount, criteriaDetail.phrase, criteriaDetail.threshold, detailId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new CriteriaDetail(
        result.rows[0].detail_id,
        result.rows[0].question_id,
        result.rows[0].criteria_id,
        result.rows[0].wordcount,
        result.rows[0].phrase,
        result.rows[0].threshold
      );
    }
    return null;
  }

  static async delete(detailId) {
    const query = 'DELETE FROM CriteriaDetail WHERE detail_id = $1';
    const values = [detailId];
    await db.query(query, values);
  }
}

module.exports = CriteriaDetail;