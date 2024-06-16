const Teacher = require('../models/Teacher');
const Question = require('../models/Question');
const QuestionBank = require('../models/QuestionBank');


class TeacherService {
  async createExam(examData) {
    return await Teacher.createExam(examData);
  }

  async getExamById(examId) {
    return await Teacher.getExamById(examId);
  }

  async deleteExam(examId) {
    await Teacher.deleteExam(examId);
  }

  async gradeScore(examId, studentId) {
    return await Teacher.gradeScore(examId, studentId);
  }

  async addQuestionToExam(examId, questionId, maxScore){
    return await Teacher.addQuestionToExam(examId, questionId, maxScore);
  }

  async getAllExams() {
    return await Teacher.getAllExams();
  }

  static async getQuestionsByQuestionBankId(questionBankId) {
    const questions = await Question.getByQuestionBankId(questionBankId);
    return questions;
  }

  static async getAllQuestionBanks() {
    const questionBanks = await QuestionBank.getAll();
    return questionBanks;
  }
  static async getAllStudentsByExamId(examId) {
    const students = await Teacher.getAllStudentsByExamId(examId);
    return students;
  }
}

module.exports = new TeacherService();