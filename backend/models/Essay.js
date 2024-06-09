const db = require('../config/database');
const ExamQuestion = require('./ExamQuestion');
const Question = require('./Question');
const CriteriaDetail = require('./CriteriaDetail'); 

class Essay {
  constructor(essayId, examId, studentId, essayContent, submitTime) {
    this.essayId = essayId;
    this.examId = examId;
    this.studentId = studentId;
    this.essayContent = essayContent;
    this.submitTime = submitTime;
  }

  static async create(essay) {
    const query =
      `INSERT INTO Essay (exam_id, student_id, essay_content, submit_time) VALUES ($1, $2, $3, $4) 
      RETURNING "essay_id", "exam_id", "student_id", "essay_content", "submit_time"`;
    const values = [
      essay.examId,
      essay.studentId,
      essay.essayContent,
      essay.submitTime,
    ];
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
    const query = 'SELECT * FROM Essay WHERE "essay_id" = $1';
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

  static async calculateScore(essayId) {
    const essay = await Essay.getById(essayId);
    if (!essay) {
      throw new Error('Essay not found');
    }

    const examQuestions = await ExamQuestion.getByExamId(essay.examId);
    const question = await Question.getById(examQuestions[0].questionId); // Lấy câu hỏi đầu tiên trong đề thi
    const criteriaDetails = await CriteriaDetail.getByQuestionId(question.questionId);

    let totalCriteria = criteriaDetails.length;
    let totalScore = 0;

    for (const criteriaDetail of criteriaDetails) {
      let criteriaScore = 0;
      if (criteriaDetail.criteriaId === 'C001') { // Contains phrase
        const phraseCount = (essay.essayContent.match(new RegExp(criteriaDetail.phrase, 'gi')) || []).length;
        criteriaScore = phraseCount > 0 ? 1 : 0;
      } else if (criteriaDetail.criteriaId === 'C002') { // Count contains phrase
        const phraseCount = (essay.essayContent.match(new RegExp(criteriaDetail.phrase, 'gi')) || []).length;
        criteriaScore = phraseCount >= criteriaDetail.threshold ? 1 : 0;
      } else if (criteriaDetail.criteriaId === 'C003') { // Longer than
        const wordCount = essay.essayContent.split(/\s+/).length;
        criteriaScore = wordCount >= criteriaDetail.threshold ? 1 : 0;
      }

      totalScore += criteriaScore;
    }

    // Normalize the score to a 10-point scale
    const finalScore = (totalScore / totalCriteria) * 10;

    return finalScore;
  }
}

module.exports = Essay;