const examResultService = require('../services/examResultService');

const createExamResult = async (req, res) => {
  try {
    const examResult = await examResultService.createExamResult(req.body);
    res.success(res, examResult);
  } catch (err) {
    res.error(res, err);
  }
};

const getExamResultById = async (req, res) => {
  try {
    const examResult = await examResultService.getExamResultById(req.params.result_id);
    res.success(res, examResult);
  } catch (err) {
    res.error(res, err);
  }
};

const getExamResultsByEssayId = async (req, res) => {
  try {
    const examResults = await examResultService.getExamResultsByEssayId(req.params.essay_id);
    res.success(res, examResults);
  } catch (err) {
    res.error(res, err);
  }
};

const updateExamResult = async (req, res) => {
  try {
    const examResult = await examResultService.updateExamResult(req.params.result_id, req.body);
    res.success(res, examResult);
  } catch (err) {
    res.error(res, err);
  }
};

const deleteExamResult = async (req, res) => {
  try {
    await examResultService.deleteExamResult(req.params.result_id);
    res.success(res, { message: 'Exam result deleted successfully' });
  } catch (err) {
    res.error(res, err);
  }
};

const calculateOverallScore = async (req, res) => {
  try {
    const score = await examResultService.calculateOverallScore(req.params.essay_id);
    res.success(res, { score });
  } catch (err) {
    res.error(res, err);
  }
};
const getExamResultsByStudentAndExamId = async (req, res) => {
  try {
    const essays = await Essay.getByStudentAndExamId(req.params.student_id, req.params.exam_id);
    const examResults = await Promise.all(essays.map(essay => examResultService.getExamResultsByEssayId(essay.essay_id)));
    res.success(res, examResults);
  } catch (err) {
    res.error(res, err);
  }
};

const getExamResultsByStudentAndEssayId = async (req, res) => {
  try {
    const examResults = await examResultService.getExamResultsByEssayId(req.params.essay_id);
    res.success(res, examResults);
  } catch (err) {
    res.error(res, err);
  }
};

const getExamResultDetails = async (req, res) => {
  try {
    const resultDetails = await examResultService.getExamResultDetails(req.params.essay_id);
    res.success(res, resultDetails);
  } catch (err) {
    res.error(res, err);
  }
};
module.exports = {
  createExamResult,
  getExamResultById,
  getExamResultsByEssayId,
  updateExamResult,
  deleteExamResult,
  calculateOverallScore,
  getExamResultsByStudentAndExamId,
  getExamResultsByStudentAndEssayId,
  getExamResultDetails
};