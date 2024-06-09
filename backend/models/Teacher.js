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

  static async gradeEssay(essayId, teacherId, score) {
    const essay = await Essay.getById(essayId);
    if (!essay) {
      throw new Error('Essay not found');
    }

    const examResult = await ExamResult.create({
      essayId: essayId,
      gradedBy: teacherId,
      score: score,
    });

    const examCriterias = await CriteriaDetail.getByQuestionId(essay.question_id);
    await Promise.all(
      examCriterias.map(criteria =>
        ExamResultCriteria.create({
          resultId: examResult.resultId,
          criteriaId: criteria.criteria_id,
        })
      )
    );

    return examResult;
  }
}

module.exports = Teacher;
