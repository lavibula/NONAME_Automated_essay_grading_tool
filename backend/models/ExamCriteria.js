const db = require('../database/db');

class ExamCriteria {
  constructor(criteriaId, criteriaName, type, phrase, threshold, wordCount, maxScore) {
    this.criteriaId = criteriaId;
    this.criteriaName = criteriaName;
    this.type = type;
    this.phrase = phrase;
    this.threshold = threshold;
    this.wordCount = wordCount;
    this.maxScore = maxScore;
  }

  static async create(examCriteria) {
    const query = 'INSERT INTO Criteria (criteria_name, type, phrase, threshold, wordCount, maxScore) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [examCriteria.criteriaName, examCriteria.type, examCriteria.phrase, examCriteria.threshold, examCriteria.wordCount, examCriteria.maxScore];
    const result = await db.query(query, values);

    // Trả về một đối tượng ExamCriteria mới từ hàng đầu tiên của kết quả trả về
    return result.rows.length > 0 ? new ExamCriteria(result.rows[0].criteria_id, result.rows[0].criteria_name, result.rows[0].type, result.rows[0].phrase, result.rows[0].threshold, result.rows[0].wordCount, result.rows[0].maxScore) : null;
}

  static async getByExamId(examId) {
    const query = 'SELECT * FROM Criteria WHERE criteria_id IN (SELECT criteriaId FROM ExamResults WHERE essay_id IN (SELECT essay_id FROM Essay WHERE exam_id = $1))';
    const values = [examId];
    const result = await db.query(query, values);
    return result.rows.map(row => new ExamCriteria(...row));
  }

  static async update(criteriaId, examCriteria) {
    const query = 'UPDATE Criteria SET criteria_name = $1, type = $2, phrase = $3, threshold = $4, wordCount = $5, maxScore = $6 WHERE criteria_id = $7 RETURNING *';
    const values = [examCriteria.criteriaName, examCriteria.type, examCriteria.phrase, examCriteria.threshold, examCriteria.wordCount, examCriteria.maxScore, criteriaId];
    const result = await db.query(query, values);

    if (result.rows.length > 0) {
        const updatedCriteria = result.rows[0];
        return new ExamCriteria(updatedCriteria.criteria_id, updatedCriteria.criteria_name, updatedCriteria.type, updatedCriteria.phrase, updatedCriteria.threshold, updatedCriteria.wordCount, updatedCriteria.maxScore);
    } else {
        return null;
    }
}


  static async delete(criteriaId) {
    const query = 'DELETE FROM Criteria WHERE criteria_id = $1';
    const values = [criteriaId];
    await db.query(query, values);
  }
}

module.exports = ExamCriteria;