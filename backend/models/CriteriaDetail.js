const db = require('../config/database');

class CriteriaDetail {
  constructor(detailId, questionId, criteriaId, wordcount, containPhrase, threshold, weight) {
    this.detailId = detailId;
    this.questionId = questionId;
    this.criteriaId = criteriaId;
    this.wordcount = wordcount;
    this.containPhrase = containPhrase;
    this.threshold = threshold;
    this.weight = weight;
  }

  static async create(criteriaDetail) {
    const query = `INSERT INTO CriteriaDetail (question_id, criteria_id, wordcount, contain_phrase, threshold) VALUES ($1, $2, $3, $4, $5) RETURNING "detail_id", "question_id", "criteria_id", "wordcount", "contain_phrase", "threshold"`;
    const values = [criteriaDetail.questionId, criteriaDetail.criteriaId, criteriaDetail.wordcount, criteriaDetail.containPhrase, criteriaDetail.threshold];
    const result = await db.query(query, values);
    return new CriteriaDetail(
      result.rows[0].detail_id,
      result.rows[0].question_id,
      result.rows[0].criteria_id,
      result.rows[0].wordcount,
      result.rows[0].contain_phrase,
      result.rows[0].threshold,
      result.rows[0].weight
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
        result.rows[0].wordcount,
        result.rows[0].contain_phrase,
        result.rows[0].threshold,
        result.rows[0].weight
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
      row.wordcount,
      row.contain_phrase,
      row.threshold,
      row.weight
    ));
  }

  static async update(detailId, criteriaDetail) {
    const query = 'UPDATE CriteriaDetail SET "question_id" = $1, "criteria_id" = $2, "wordcount" = $3, "contain_phrase" = $4, "threshold" = $5 WHERE "detail_id" = $6 RETURNING *';
    const values = [criteriaDetail.questionId, criteriaDetail.criteriaId, criteriaDetail.wordcount, criteriaDetail.containPhrase, criteriaDetail.threshold, detailId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new CriteriaDetail(
        result.rows[0].detail_id,
        result.rows[0].question_id,
        result.rows[0].criteria_id,
        result.rows[0].wordcount,
        result.rows[0].contain_phrase,
        result.rows[0].threshold,
        result.rows[0].weight
      );
    }
    return null;
  }

  static async updateWeight(detailId, weight) {
    const query = 'UPDATE CriteriaDetail SET "weight" = $1 WHERE "detail_id" = $2 RETURNING *';
    const values = [weight, detailId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      const { detail_id, question_id, criteria_id, wordcount, contain_phrase, threshold, weight } = result.rows[0];
      return new CriteriaDetail(detail_id, question_id, criteria_id, wordcount, contain_phrase, threshold, weight);
    }
    return null;
  }


}

module.exports = CriteriaDetail;