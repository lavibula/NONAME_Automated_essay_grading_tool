const Teacher = require('../models/Teacher');
const Question = require('../models/Question');
const QuestionBank = require('../models/QuestionBank');
const Criteria = require('../models/Criteria');
const CriteriaDetail = require('../models/CriteriaDetail');
class TeacherService {
  async createExam(examData) {
    return await Teacher.createExam(examData);
  }


  async updateCriteriaDetailWeight(detailId, weight) {
    try {
      const updatedDetail = await CriteriaDetail.updateWeight(detailId, weight);
  
      const updatedDetails = await CriteriaDetail.getByQuestionId(updatedDetail.questionId);
  
      const totalWeight = updatedDetails.reduce((total, detail) => total + parseFloat(detail.weight), 0);
  
      if (updatedDetails.length === 1 && totalWeight === 1.0) {
        return "You only have 1 criteria for this question, please don't update it";
      } else if (updatedDetails.length >= 1 && totalWeight < 1.0) {
        return `Total weight of criteria details for questionId ${updatedDetail.questionId} is less than 1.0. Please update the weight.`;
      } else if (updatedDetails.length > 1 && totalWeight === 1.0) {
        const remainingCriteriaDetails = updatedDetails.filter(detail => detail.detailId !== detailId);
        const remainingWeight = 1.0 - weight;
  
        const updatePromises = remainingCriteriaDetails.map(async (detail) => {
          const adjustedWeight = remainingWeight / (remainingCriteriaDetails.length - 1);
          await CriteriaDetail.updateWeight(detail.detailId, adjustedWeight);
        });
  
        await Promise.all(updatePromises);
  
        return updatedDetail;
      }
    } catch (error) {
      console.error('Error updating criteria detail weight:', error);
      throw new Error('Failed to update criteria detail weight.');
    }
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

  async addQuestionToExam(examId, questionId, maxScore) {
    return await Teacher.addQuestionToExam(examId, questionId, maxScore);
  }

  async getAllExams() {
    return await Teacher.getAllExams();
  }

  async getQuestionsByQuestionBankId(questionBankId) {
    const questions = await Question.getByQuestionBankId(questionBankId);
    return questions;
  }

  async getAllQuestionBanks() {
    const questionBanks = await QuestionBank.getAll();
    return questionBanks;
  }

  async getAllStudentsByExamId(examId) {
    const students = await Teacher.getAllStudentsByExamId(examId);
    return students;
  }

  async autoGradeAllStudents(examId) {
    const students = await Teacher.getAllStudentsByExamId(examId);

    for (const student of students) {
      const studentId = student.student_id;
      try {
        await Teacher.gradeScore(examId, studentId);
        console.log(`Graded exam for student ${studentId} in exam ${examId}.`);
      } catch (error) {
        console.error(`Failed to grade exam for student ${studentId} in exam ${examId}: ${error.message}`);
      }
    }

    console.log(`Automatic grading completed for exam ${examId}.`);
  }

  async getResultByExamId(examId) {
    return await Teacher.getResultByExamId(examId);
  }

  async getResultByStudentId(studentId) {
    return await Teacher.getResultByStudentId(studentId);
  }

  async getCriteriaByQuestionId(questionId) {
    try {
      const criteriaDetails = await CriteriaDetail.getByQuestionId(questionId);

      const criteriaPromises = criteriaDetails.map(async (detail) => {
        const criteria = await Criteria.getById(detail.criteriaId);
        return {
          detail,
          criteriaName: criteria.criteriaName,
        };
      });
      const criteria = await Promise.all(criteriaPromises);
      return criteria;
    } catch (err) {
      throw new Error(`Failed to fetch criteria for question ${questionId}: ${err.message}`);
    }
  }
}

module.exports = new TeacherService();
