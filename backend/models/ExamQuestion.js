const db = require('../config/database');

class ExamQuestion {
  constructor(examquestionId, examId, questionId, maxScore) {
    this.examquestionId = examquestionId;
    this.examId = examId;
    this.questionId = questionId;
    this.maxScore = maxScore;
  }

  static async create(examQuestion) {
    const query = `INSERT INTO ExamQuestion (exam_id, question_id, max_score) VALUES ($1, $2, $3) RETURNING "examquestion_id", "exam_id", "question_id", "max_score"`;
    const values = [examQuestion.examId, examQuestion.questionId, examQuestion.maxScore];
    const result = await db.query(query, values);
    return new ExamQuestion(
      result.rows[0].examquestion_id,
      result.rows[0].exam_id,
      result.rows[0].question_id,
      result.rows[0].max_score
    );
  }

  static async getById(examquestionId) {
    const query = `SELECT * FROM ExamQuestion WHERE "examquestion_id" = $1`;
    const values = [examquestionId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new ExamQuestion(
        result.rows[0].examquestion_id,
        result.rows[0].exam_id,
        result.rows[0].question_id,
        result.rows[0].max_score
      );
    }
    return null;
  }

  static async getByExamId(examId) {
    const query = 'SELECT * FROM ExamQuestion WHERE "exam_id" = $1';
    const values = [examId];
    const result = await db.query(query, values);
    return result.rows.map(row => new ExamQuestion(
      row.examquestion_id,
      row.exam_id,
      row.question_id,
      row.max_score
    ));
  }

  static async deleteByExamId(examId) {
    const query = 'DELETE FROM ExamQuestion WHERE "exam_id" = $1';
    const values = [examId];
    await db.query(query, values);
  }
}

module.exports = ExamQuestion;