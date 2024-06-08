const Exam = require('../models/Exam');
const ExamQuestion = require('../models/ExamQuestion');
const ExamCriteria = require('../models/ExamCriteria');
const Question = require('../models/Question');

class ExamService {
  async createExam(exam) {
    const createdExam = await Exam.create(exam);
    const examQuestions = exam.questions.map((question, index) => ({
      examId: createdExam.id,
      questionId: question.id,
      orderNumber: index + 1,
    }));
    await Promise.all(examQuestions.map(examQuestion => ExamQuestion.create(examQuestion)));
    return createdExam;
  }

  async getExamById(id) {
    const exam = await Exam.getById(id);
    if (exam) {
      const questions = await ExamQuestion.getByExamId(id).then(examQuestions => Promise.all(examQuestions.map(examQuestion => Question.getById(examQuestion.questionId))));
      const criteria = await ExamCriteria.getByExamId(id);
      exam.questions = questions;
      exam.criteria = criteria;
    }
    return exam;
  }

  async getExamByName(name) {
    return await Exam.getByName(name);
  }

  async updateExam(id, exam) {
    await ExamQuestion.deleteByExamId(id);
    await ExamCriteria.delete(id);
    const updatedExam = await Exam.update(id, exam);
    const examQuestions = exam.questions.map((question, index) => ({
      examId: id,
      questionId: question.id,
      orderNumber: index + 1,
    }));
    await Promise.all(examQuestions.map(examQuestion => ExamQuestion.create(examQuestion)));
    return updatedExam;
  }

  async deleteExam(id) {
    await ExamQuestion.deleteByExamId(id);
    await ExamCriteria.delete(id);
    await Exam.delete(id);
  }

  async activateExam(id) {
    const exam = await Exam.getById(id);
    if (exam) {
      await Exam.update(id, { ...exam, isActive: true });
      // Chấm điểm tự động cho tất cả bài nộp của đề thi này
      const submissions = await Submission.getByExamId(id);
      await Promise.all(submissions.map(submission => Score.calculateScoresForSubmission(submission.id, exam.criteria)));
    }
  }

  async deactivateExam(id) {
    const exam = await Exam.getById(id);
    if (exam) {
      await Exam.update(id, { ...exam, isActive: false });
    }
  }

  async getExamsByCreated(userId) {
    return await Exam.getByCreated(userId);
  }

  async getExamResultDetails(essayId) {
    const examResults = await this.getExamResultsByEssayId(essayId);
    const essay = await Essay.getById(essayId);
    if (examResults.length > 0) {
      return {
        examResult: examResults[0],
        essay: essay
      };
    }
    return null;
  }
}

module.exports = new ExamService();