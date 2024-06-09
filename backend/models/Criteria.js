const db = require('../config/database');

class Criteria {
  constructor(criteriaId, criteriaName) {
    this.criteriaId = criteriaId;
    this.criteriaName = criteriaName;
  }

  static async create(criteria) {
    const query = 'INSERT INTO Criteria (criteria_id, criteria_name) VALUES ($1, $2) RETURNING *';
    const values = [criteria.criteriaId, criteria.criteriaName];
    const result = await db.query(query, values);
    return new Criteria(
      result.rows[0].criteria_id,
      result.rows[0].criteria_name
    );
  }

  static async getById(criteriaId) {
    const query = 'SELECT * FROM Criteria WHERE "criteria_id" = $1';
    const values = [criteriaId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new Criteria(
        result.rows[0].criteria_id,
        result.rows[0].criteria_name
      );
    }
    return null;
  }

  static async getAll() {
    const query = 'SELECT * FROM Criteria';
    const result = await db.query(query);
    return result.rows.map(row => new Criteria(
      row.criteria_id,
      row.criteria_name
    ));
  }

  static async update(criteriaId, criteria) {
    const query = 'UPDATE Criteria SET "criteria_name" = $1 WHERE "criteria_id" = $2 RETURNING *';
    const values = [criteria.criteriaName, criteriaId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new Criteria(
        result.rows[0].criteria_id,
        result.rows[0].criteria_name
      );
    }
    return null;
  }

  static async delete(criteriaId) {
    const query = 'DELETE FROM Criteria WHERE "criteria_id" = $1';
    const values = [criteriaId];
    await db.query(query, values);
  }
}

module.exports = Criteria;