const db = require('../database/db');

class QuestionBank {
  constructor(bankId, bankName, description, createdBy) {
    this.bank_id = bankId;
    this.bank_name = bankName;
    this.description = description;
    this.created_by = createdBy;
  }

  static async create(questionBank) {
    const query = 'INSERT INTO QuestionBank (bank_id, bank_name, description, created_by) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [questionBank.bank_id, questionBank.bank_name, questionBank.description, questionBank.created_by];
    const result = await db.query(query, values);
    return new QuestionBank(
      result.rows[0].bank_id,
      result.rows[0].bank_name,
      result.rows[0].description,
      result.rows[0].created_by
    );
  }

  static async getById(bankId) {
    const query = 'SELECT * FROM QuestionBank WHERE bank_id = $1';
    const values = [bankId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new QuestionBank(
        result.rows[0].bank_id,
        result.rows[0].bank_name,
        result.rows[0].description,
        result.rows[0].created_by
      );
    }
    return null;
  }

  static async getAll() {
    const query = 'SELECT * FROM QuestionBank';
    const result = await db.query(query);
    return result.rows.map(row => new QuestionBank(
      row.bank_id,
      row.bank_name,
      row.description,
      row.created_by
    ));
  }

  static async update(bankId, questionBank) {
    const query = 'UPDATE QuestionBank SET bank_name = $1, description = $2, created_by = $3 WHERE bank_id = $4 RETURNING *';
    const values = [questionBank.bank_name, questionBank.description, questionBank.created_by, bankId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new QuestionBank(
        result.rows[0].bank_id,
        result.rows[0].bank_name,
        result.rows[0].description,
        result.rows[0].created_by
      );
    }
    return null;
  }

  static async delete(bankId) {
    const query = 'DELETE FROM QuestionBank WHERE bank_id = $1';
    const values = [bankId];
    await db.query(query, values);
  }
}

module.exports = QuestionBank;