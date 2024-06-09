const db = require('../config/database');

class ExamQuestion {
  constructor(examQuestionId, examId, questionId) {
    this.examQuestionId = examQuestionId;
    this.examId = examId;
    this.questionId = questionId;
  }

  static async create(examQuestion) {
    const query =
      `INSERT INTO ExamQuestion (exam_id, question_id) VALUES ($1, $2) 
      RETURNING "examquestion_id", "exam_id", "question_id"`;
    const values = [
      examQuestion.examId,
      examQuestion.questionId,
    ];
    const result = await db.query(query, values);
    return new ExamQuestion(
      result.rows[0].examquestion_id,
      result.rows[0].exam_id,
      result.rows[0].question_id,
    );
  }

  static async getByExamId(examId) {
    const query = 'SELECT * FROM ExamQuestion WHERE "exam_id" = $1';
    const values = [examId];
    const result = await db.query(query, values);
    return result.rows.map(row => new ExamQuestion(
      row.examquestion_id,
      row.exam_id,
      row.question_id,
    ));
  }

  static async deleteByExamId(examId) {
    const query = 'DELETE FROM ExamQuestion WHERE "exam_id" = $1';
    const values = [examId];
    await db.query(query, values);
  }
}

module.exports = ExamQuestion;