const ExamQuestion = require('../models/ExamQuestion');
const Question = require('../models/Question');

class ExamQuestionService {
  async createExamQuestion(examQuestionData) {
    // Validate if question_id exists in Question table
    const questionExists = await Question.getById(examQuestionData.question_id);
    if (!questionExists) {
      throw new Error('Invalid question ID');
    }
    return await ExamQuestion.create(examQuestionData);
  }

  async getExamQuestionById(examQuestionId) {
    return await ExamQuestion.getById(examQuestionId);
  }

  async getExamQuestionsByExamId(examId) {
    return await ExamQuestion.getByExamId(examId);
  }

  async updateExamQuestion(examQuestionId, examQuestionData) {
    // Validate if question_id exists in Question table
    const questionExists = await Question.getById(examQuestionData.question_id);
    if (!questionExists) {
      throw new Error('Invalid question ID');
    }
    return await ExamQuestion.update(examQuestionId, examQuestionData);
  }

  async deleteExamQuestion(examQuestionId) {
    await ExamQuestion.delete(examQuestionId);
  }
}

module.exports = new ExamQuestionService();