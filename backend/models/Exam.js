const db = require('../config/database');
class Exam {
  constructor(examId, examTitle, description, createdBy) {
    this.examId = examId;
    this.examTitle = examTitle;
    this.description = description;
    this.createdBy = createdBy;
  }

  static async create(exam) {
    const query = `INSERT INTO Exam (exam_title, description, created_by) VALUES ($1, $2, $3) 
                    RETURNING "exam_id", "exam_title", "description", "created_by"`;
    const values = [exam.examTitle, exam.description, exam.createdBy];
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


}

module.exports = Exam;