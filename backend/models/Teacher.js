const User = require('./User');
const Exam = require('./Exam');
const ExamQuestion = require('./ExamQuestion');
const CriteriaDetail = require('./CriteriaDetail');
const Question = require('./Question');
const Essay = require('./Essay');
const ExamResult = require('./ExamResult');
const ExamResultCriteria = require('./ExamResultCriteria');

class Teacher extends User {
  static async createExam(examData) {
    const createdExam = await Exam.create(examData);

    const examQuestions = examData.questions.map((question) => ({
      examId: createdExam.exam_id,
      questionId: question.question_id,
    }));
    await Promise.all(examQuestions.map(examQuestion => ExamQuestion.create(examQuestion)));

    return createdExam;
  }

  static async getExamById(examId) {
    const exam = await Exam.getById(examId);
    if (exam) {
      const examQuestions = await ExamQuestion.getByExamId(examId);
      const questions = await Promise.all(examQuestions.map(examQuestion => Question.getById(examQuestion.questionId)));
      exam.questions = questions;
    }
    return exam;
  }

  static async updateExam(examId, examData) {
    await ExamQuestion.deleteByExamId(examId);

    const updatedExam = await Exam.update(examId, examData);

    const examQuestions = examData.questions.map((question) => ({
      examId: examId,
      questionId: question.question_id,
    }));
    await Promise.all(examQuestions.map(examQuestion => ExamQuestion.create(examQuestion)));

    return updatedExam;
  }

  static async deleteExam(examId) {
    await ExamQuestion.deleteByExamId(examId);
    await Exam.delete(examId);
  }

  static async gradeEssay(essayId, teacherId) {
    try {
      // Lấy thông tin bài luận
      const essay = await Essay.getById(essayId);
      if (!essay) {
        throw new Error('Essay not found');
      }
  
      // Tính điểm bài luận
      const score = await Essay.calculateScore(essayId);
  
      // Lưu kết quả chấm điểm
      const gradedResult = await ExamResult.create({
        essayId: essayId,
        gradedBy: teacherId,
        score: score,
        gradedTime: new Date(), // Lưu thời gian chấm điểm hiện tại
      });
  
      // Lấy các tiêu chí của câu hỏi trong bài luận
      const examQuestions = await ExamQuestion.getByExamId(essay.examId);
      const question = await Question.getById(examQuestions[0].questionId); // Lấy câu hỏi đầu tiên trong đề thi
      const criteriaDetails = await CriteriaDetail.getByQuestionId(question.questionId);
  
      // Lưu kết quả tiêu chí chấm điểm
      await Promise.all(
        criteriaDetails.map(criteriaDetail =>
          ExamResultCriteria.create({
            resultId: gradedResult.resultId,
            criteriaId: criteriaDetail.criteriaId,
          })
        )
      );
  
      // Trả về kết quả chấm điểm
      return gradedResult;
    } catch (error) {
      console.error('Lỗi khi chấm điểm bài luận:', error);
      throw error;
    }
  }
}

module.exports = Teacher;
