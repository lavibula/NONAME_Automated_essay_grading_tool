const Essay = require('../models/Essay');
const CriteriaDetail = require('../models/CriteriaDetail');
const Question = require('../models/Question');
const ExamQuestion = require('../models/ExamQuestion');

class EssayService {
  async createEssay(essayData) {
    return await Essay.create(essayData);
  }

  async getEssayById(essayId) {
    return await Essay.getById(essayId);
  }

  async getEssaysByExamId(examId) {
    return await Essay.getByExamId(examId);
  }

  async getEssaysByStudentId(studentId) {
    return await Essay.getByStudentId(studentId);
  }

  async updateEssay(essayId, essayData) {
    return await Essay.update(essayId, essayData);
  }

  async deleteEssay(essayId) {
    await Essay.delete(essayId);
  }

  async calculateScore(essayId) {
    const essay = await this.getEssayById(essayId);
    const examQuestion = await ExamQuestion.getByExamId(essay.exam_id);
    const question = await Question.getById(examQuestion.question_id);
    const criteriaDetails = await CriteriaDetail.getByQuestionId(question.question_id);

    let totalScore = 0;
    let criteriaScore = 0;
    for (const criteriaDetail of criteriaDetails) {
      if (criteriaDetail.criteria_id === 'C001') { // Contains phrase
        const phraseCount = essay.essay_content.match(new RegExp(criteriaDetail.phrase, 'gi')).length;
        criteriaScore = phraseCount * 10; // Assume each phrase is worth 10 points
      } else if (criteriaDetail.criteria_id === 'C002') { // Count contains phrase
        const phraseCount = essay.essay_content.match(new RegExp(criteriaDetail.phrase, 'gi')).length;
        criteriaScore = Math.min(phraseCount, criteriaDetail.threshold) * 10; // Assuming 10 points per phrase
      } else if (criteriaDetail.criteria_id === 'C003') { // Longer than
        const wordCount = essay.essay_content.split(/\s+/).length;
        criteriaScore = wordCount >= criteriaDetail.threshold ? 10 : 0; // Assuming 10 points for meeting the threshold
      }

      totalScore += criteriaScore;
    }

    return totalScore;
  }

  async getEssaysByStudentAndExamId(studentId, examId) {
    return await Essay.getByStudentAndExamId(studentId, examId);
  }
}

module.exports = new EssayService();