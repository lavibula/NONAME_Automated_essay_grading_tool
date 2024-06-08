const examQuestionService = require('../services/examQuestionService');

const createExamQuestion = async (req, res) => {
  try {
    const examQuestion = await examQuestionService.createExamQuestion(req.body);
    res.success(res, examQuestion);
  } catch (err) {
    res.error(res, err);
  }
};

const getExamQuestionById = async (req, res) => {
  try {
    const examQuestion = await examQuestionService.getExamQuestionById(req.params.examquestion_id);
    res.success(res, examQuestion);
  } catch (err) {
    res.error(res, err);
  }
};

const getExamQuestionsByExamId = async (req, res) => {
  try {
    const examQuestions = await examQuestionService.getExamQuestionsByExamId(req.params.exam_id);
    res.success(res, examQuestions);
  } catch (err) {
    res.error(res, err);
  }
};

const updateExamQuestion = async (req, res) => {
  try {
    const examQuestion = await examQuestionService.updateExamQuestion(req.params.examquestion_id, req.body);
    res.success(res, examQuestion);
  } catch (err) {
    res.error(res, err);
  }
};

const deleteExamQuestion = async (req, res) => {
  try {
    await examQuestionService.deleteExamQuestion(req.params.examquestion_id);
    res.success(res, { message: 'Exam question deleted successfully' });
  } catch (err) {
    res.error(res, err);
  }
};

module.exports = {
  createExamQuestion,
  getExamQuestionById,
  getExamQuestionsByExamId,
  updateExamQuestion,
  deleteExamQuestion
};