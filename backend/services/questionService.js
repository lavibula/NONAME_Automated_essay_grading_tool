const Question = require('../models/Question');

class QuestionService {
  async createQuestion(question) {
    return await Question.create(question);
  }

  async getQuestionById(id) {
    return await Question.getById(id);
  }

  async updateQuestion(id, question) {
    return await Question.update(id, question);
  }

  async deleteQuestion(id) {
    await Question.delete(id);
  }
}

module.exports = new QuestionService();