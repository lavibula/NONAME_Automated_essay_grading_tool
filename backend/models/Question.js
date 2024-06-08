const db = require('../database/db');

class Question {
  constructor(questionId, bankId, questionContent) {
    this.question_id = questionId;
    this.bank_id = bankId;
    this.question_content = questionContent;
  }

  static async create(question) {
    const query = 'INSERT INTO Question (question_id, bank_id, question_content) VALUES ($1, $2, $3) RETURNING *';
    const values = [question.question_id, question.bank_id, question.question_content];
    const result = await db.query(query, values);
    return new Question(
      result.rows[0].question_id,
      result.rows[0].bank_id,
      result.rows[0].question_content
    );
  }

  static async getById(questionId) {
    const query = 'SELECT * FROM Question WHERE question_id = $1';
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

  static async getByBankId(bankId) {
    const query = 'SELECT * FROM Question WHERE bank_id = $1';
    const values = [bankId];
    const result = await db.query(query, values);
    return result.rows.map(row => new Question(
      row.question_id,
      row.bank_id,
      row.question_content
    ));
  }

  static async update(questionId, question) {
    const query = 'UPDATE Question SET bank_id = $1, question_content = $2 WHERE question_id = $3 RETURNING *';
    const values = [question.bank_id, question.question_content, questionId];
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
    const query = 'DELETE FROM Question WHERE question_id = $1';
    const values = [questionId];
    await db.query(query, values);
  }
}

module.exports = Question;