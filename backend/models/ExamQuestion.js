const db = require('../database/db');

class ExamQuestion {
  constructor(examQuestionId, examId, questionId) {
    this.examquestion_id = examQuestionId;
    this.exam_id = examId;
    this.question_id = questionId;
  }

  static async create(examQuestion) {
    const query = 'INSERT INTO ExamQuestion (examquestion_id, exam_id, question_id) VALUES ($1, $2, $3) RETURNING *';
    const values = [examQuestion.examquestion_id, examQuestion.exam_id, examQuestion.question_id];
    const result = await db.query(query, values);
    return new ExamQuestion(
      result.rows[0].examquestion_id,
      result.rows[0].exam_id,
      result.rows[0].question_id
    );
  }

  static async getById(examQuestionId) {
    const query = 'SELECT * FROM ExamQuestion WHERE examquestion_id = $1';
    const values = [examQuestionId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new ExamQuestion(
        result.rows[0].examquestion_id,
        result.rows[0].exam_id,
        result.rows[0].question_id
      );
    }
    return null;
  }

  static async getByExamId(examId) {
    const query = 'SELECT * FROM ExamQuestion WHERE exam_id = $1';
    const values = [examId];
    const result = await db.query(query, values);
    return result.rows.map(row => new ExamQuestion(
      row.examquestion_id,
      row.exam_id,
      row.question_id
    ));
  }

  static async update(examQuestionId, examQuestion) {
    const query = 'UPDATE ExamQuestion SET exam_id = $1, question_id = $2 WHERE examquestion_id = $3 RETURNING *';
    const values = [examQuestion.exam_id, examQuestion.question_id, examQuestionId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new ExamQuestion(
        result.rows[0].examquestion_id,
        result.rows[0].exam_id,
        result.rows[0].question_id
      );
    }
    return null;
  }

  static async delete(examQuestionId) {
    const query = 'DELETE FROM ExamQuestion WHERE examquestion_id = $1';
    const values = [examQuestionId];
    await db.query(query, values);
  }
}

module.exports = ExamQuestion;