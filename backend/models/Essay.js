const db = require('../database/db');

class Essay {
  constructor(essayId, examId, studentId, essayContent, submitTime) {
    this.essay_id = essayId;
    this.exam_id = examId;
    this.student_id = studentId;
    this.essay_content = essayContent;
    this.submit_time = submitTime;
  }

  static async create(essay) {
    const query = 'INSERT INTO Essay (essay_id, exam_id, student_id, essay_content, submit_time) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [essay.essay_id, essay.exam_id, essay.student_id, essay.essay_content, essay.submit_time];
    const result = await db.query(query, values);
    return new Essay(
      result.rows[0].essay_id,
      result.rows[0].exam_id,
      result.rows[0].student_id,
      result.rows[0].essay_content,
      result.rows[0].submit_time
    );
  }

  static async getById(essayId) {
    const query = 'SELECT * FROM Essay WHERE essay_id = $1';
    const values = [essayId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new Essay(
        result.rows[0].essay_id,
        result.rows[0].exam_id,
        result.rows[0].student_id,
        result.rows[0].essay_content,
        result.rows[0].submit_time
      );
    }
    return null;
  }

  static async getByExamId(examId) {
    const query = 'SELECT * FROM Essay WHERE exam_id = $1';
    const values = [examId];
    const result = await db.query(query, values);
    return result.rows.map(row => new Essay(
      row.essay_id,
      row.exam_id,
      row.student_id,
      row.essay_content,
      row.submit_time
    ));
  }

  static async getByStudentId(studentId) {
    const query = 'SELECT * FROM Essay WHERE student_id = $1';
    const values = [studentId];
    const result = await db.query(query, values);
    return result.rows.map(row => new Essay(
      row.essay_id,
      row.exam_id,
      row.student_id,
      row.essay_content,
      row.submit_time
    ));
  }

  static async update(essayId, essay) {
    const query = 'UPDATE Essay SET exam_id = $1, student_id = $2, essay_content = $3, submit_time = $4 WHERE essay_id = $5 RETURNING *';
    const values = [essay.exam_id, essay.student_id, essay.essay_content, essay.submit_time, essayId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new Essay(
        result.rows[0].essay_id,
        result.rows[0].exam_id,
        result.rows[0].student_id,
        result.rows[0].essay_content,
        result.rows[0].submit_time
      );
    }
    return null;
  }

  static async delete(essayId) {
    const query = 'DELETE FROM Essay WHERE essay_id = $1';
    const values = [essayId];
    await db.query(query, values);
  }

  static async getByStudentAndExamId(studentId, examId) {
    const query = 'SELECT * FROM Essay WHERE student_id = $1 AND exam_id = $2';
    const values = [studentId, examId];
    const result = await db.query(query, values);
    return result.rows.map(row => new Essay(
      row.essay_id,
      row.exam_id,
      row.student_id,
      row.essay_content,
      row.submit_time
    ));
  }
}

module.exports = Essay;