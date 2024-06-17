const db = require('../config/database');
class Exam {
  constructor(examId, examTitle, description, createdBy) {
    this.examId = examId;
    this.examTitle = examTitle;
    this.description = description;
    this.createdBy = createdBy;
  }

  static async create(exam) {
    
    const query = `
      INSERT INTO Exam (exam_title, description, duration, created_by, start_time, end_time)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING exam_id, exam_title, description, duration, created_by, start_time, end_time
    `;
    const values = [
      exam.examTitle,
      exam.description,
      exam.duration,
      exam.createdBy,
      exam.startTime,
      exam.endTime
    ];
    const result = await db.query(query, values);
    return new Exam(
      result.rows[0].exam_id,
      result.rows[0].exam_title,
      result.rows[0].description,
      result.rows[0].created_by
    );
  }

  static async getById(examId) {
    const query = 'SELECT * FROM Exam WHERE "exam_id" = $1';
    const values = [examId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new Exam(
        result.rows[0].exam_id,
        result.rows[0].exam_title,
        result.rows[0].description,
        result.rows[0].created_by
      );
    }
    return null;
  }

  static async update(examId, exam) {
    const query = 'UPDATE Exam SET "exam_title" = $1, "description" = $2, "created_by" = $3 WHERE "exam_id" = $4 RETURNING *';
    const values = [exam.examTitle, exam.description, exam.createdBy, examId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new Exam(
        result.rows[0].exam_id,
        result.rows[0].exam_title,
        result.rows[0].description,
        result.rows[0].created_by
      );
    }
    return null;
  }

  static async delete(examId) {
    const query = 'DELETE FROM Exam WHERE "exam_id" = $1';
    const values = [examId];
    await db.query(query, values);
  }

  static async getAll() {
    const query = 'SELECT * FROM Exam'; 
    const result = await db.query(query);
    return result.rows;
  }
}

module.exports = Exam;