const db = require('../config/database');
const User = require('./User');
const Exam = require('./Exam');
const ExamQuestion = require('./ExamQuestion');
const CriteriaDetail = require('./CriteriaDetail');
const Criteria = require('./Criteria');
const Question = require('./Question');
const Essay = require('./Essay');
const ExamResult = require('./ExamResult');
const ExamResultCriteria = require('./ExamResultCriteria');

class Teacher extends User {
  static async createExam(examData) {
    const createdExam = await Exam.create(examData);

    return createdExam;
  }

  static async createCriteria(criteriaData) {
    return await Criteria.create(criteriaData);
  }

  static async addQuestionToExam(examId, questionId, max_score) {
    const examQuestion = {
      examId: examId,
      questionId: questionId,
      maxScore: max_score
    };
    await ExamQuestion.create(examQuestion);
  }

  static async getExamById(examId) {
    const exam = await Exam.getById(examId);
    if (!exam) {
      return null; 
    }

    const createdByUser = await User.getById(exam.createdBy);
    console.log(createdByUser);
    const createdByFullname = createdByUser.fullName;

    const examQuestions = await ExamQuestion.getByExamId(examId);

    const questionsPromises = examQuestions.map(async (examQuestion) => {
      const question = await Question.getById(examQuestion.questionId);
      return {
        examquestionId: examQuestion.examquestionId, 
        questionId: examQuestion.questionId,
        question: question.questionContent 
      };
    });

    const questions = await Promise.all(questionsPromises);

    exam.questions = questions;
    exam.createdBy = createdByFullname;

    return exam;
  }

  static async deleteExam(examId) {
    await ExamQuestion.deleteByExamId(examId);
    await Exam.delete(examId);
  }

  static async gradeScore(examId, studentId) {
    // 1. Lấy danh sách bài luận của học sinh
    const essays = await Essay.findAllEssay(examId, studentId);
    if (!essays) {
      throw new Error('No essays found for this student in this exam.');
    }

    // 2. Chấm điểm cho từng bài luận
    for (const essay of essays) {
      await Essay.calculateScore(essay.essayId);
    }

    // 3. Tính điểm tổng kết cho học sinh
    const totalScore = await this.calculateTotalScore(examId, studentId);

    // 4. Cập nhật điểm tổng kết vào bảng ExamResult
    const existingExamResult = await ExamResult.getByStudentAndExamId(studentId, examId);
    if (existingExamResult) {
      await ExamResult.update(existingExamResult.resultId, { totalScore: totalScore });
    } else {
      await ExamResult.create({
        studentId: studentId,
        examId: examId,
        totalScore: totalScore,
      });
    }

    return totalScore; // Trả về điểm tổng kết
  }

  static async calculateTotalScore(examId, studentId) {
    const query = `
      SELECT SUM(erc.score * cd.weight) AS total_score
      FROM ExamResultCriteria erc
      JOIN Essay es ON erc.essay_id = es.essay_id
      JOIN ExamQuestion eq ON es.examquestion_id = eq.examquestion_id
      JOIN CriteriaDetail cd ON erc.detail_id = cd.detail_id
      WHERE eq.exam_id = $1 AND es.student_id = $2
    `;
    const values = [examId, studentId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return result.rows[0].total_score;
    }
    return 0;
  }

  static async getAllExams() {
    const exams = await Exam.getAll();
    return exams;
  }

  //hiển thị danh sách sinh viên theo examid
  static async getAllStudentsByExamId(examId) {
    const query = `SELECT DISTINCT(e.student_id), u.fullname
                   FROM ExamQuestion eq
                   JOIN Essay e ON eq.examquestion_id = e.examquestion_id
                   JOIN Users u ON u.user_id = e.student_id
                   WHERE eq.exam_id = $1`;
    const values = [examId];
    const result = await db.query(query, values);
    return result.rows;
  }

  static async getResultByExamId(examId) {
    const query = `SELECT * FROM ExamResult WHERE exam_id = $1`;
    const values = [examId];
    const result = await db.query(query, values);
    return result.rows;
  }

  static async getResultByStudentId(studentId) {
    const query = `SELECT * FROM ExamResult WHERE student_id = $1`;
    const values = [studentId];
    const result = await db.query(query, values);
    return result.rows;
  }
}

module.exports = Teacher;
