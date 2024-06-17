const db = require('../config/database');
const ExamQuestion = require('./ExamQuestion');

class Exam {
  constructor(examId, examTitle, description, duration, createdBy, startTime, endTime) {
    this.examId = examId;
    this.examTitle = examTitle;
    this.description = description;
    this.duration = duration;
    this.createdBy = createdBy;
    this.startTime = startTime;
    this.endTime = endTime;
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
      result.rows[0].duration,
      result.rows[0].created_by,
      result.rows[0].start_time,
      result.rows[0].end_time
    );
  }

  static async getById(examId) {
    const query = 'SELECT * FROM Exam WHERE exam_id = $1';
    const values = [examId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      const examData = result.rows[0];
      return new Exam(
        examData.exam_id,
        examData.exam_title,
        examData.description,
        examData.duration,
        examData.created_by,
        examData.start_time,
        examData.end_time
      );
    }
    return null;
  }

  static async update(examId, exam) {
    const query = `
      UPDATE Exam 
      SET exam_title = $1, description = $2, duration = $3, created_by = $4, start_time = $5, end_time = $6
      WHERE exam_id = $7
      RETURNING *
    `;
    const values = [
      exam.examTitle,
      exam.description,
      exam.duration,
      exam.createdBy,
      exam.startTime,
      exam.endTime,
      examId
    ];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      const updatedExam = result.rows[0];
      return new Exam(
        updatedExam.exam_id,
        updatedExam.exam_title,
        updatedExam.description,
        updatedExam.duration,
        updatedExam.created_by,
        updatedExam.start_time,
        updatedExam.end_time
      );
    }
    return null;
  }

  static async delete(examId) {
    const query = 'DELETE FROM Exam WHERE exam_id = $1';
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
