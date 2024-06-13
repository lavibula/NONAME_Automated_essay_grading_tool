const db = require('../config/database');

class Question {
  constructor(questionId, bankId, questionContent) {
    this.questionId = questionId;
    this.bankId = bankId;
    this.questionContent = questionContent;
  }

  static async create(question) {
    const query = `INSERT INTO Question (bank_id, question_content) VALUES ($1, $2) RETURNING "question_id", "bank_id", "question_content"`;
    const values = [question.bankId, question.questionContent];
    const result = await db.query(query, values);
    return new Question(
      result.rows[0].question_id,
      result.rows[0].bank_id,
      result.rows[0].question_content
    );
  }

  static async getById(questionId) {
    const query = 'SELECT * FROM Question WHERE "question_id" = $1';
    const values = [questionId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new Question(
        result.rows[0].question_id,
        result.rows[0].bank_id,
        result.rows[0].question_content
      );
    }
    return null;
  }

  static async update(questionId, question) {
    const query = 'UPDATE Question SET "bank_id" = $1, "question_content" = $2 WHERE "question_id" = $3 RETURNING *';
    const values = [question.bankId, question.questionContent, questionId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new Question(
        result.rows[0].question_id,
        result.rows[0].bank_id,
        result.rows[0].question_content
      );
    }
    return null;
  }

  static async delete(questionId) {
    const query = 'DELETE FROM Question WHERE "question_id" = $1';
    const values = [questionId];
    await db.query(query, values);
  }
}

module.exports = Question;