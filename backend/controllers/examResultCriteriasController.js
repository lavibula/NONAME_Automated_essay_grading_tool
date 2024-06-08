const examResultCriteriaService = require('../services/examResultCriteriaService');

const createExamResultCriteria = async (req, res) => {
  try {
    const examResultCriteria = await examResultCriteriaService.createExamResultCriteria(req.body);
    res.success(res, examResultCriteria);
  } catch (err) {
    res.error(res, err);
  }
};

const getExamResultCriteriaById = async (req, res) => {
  try {
    const examResultCriteria = await examResultCriteriaService.getExamResultCriteriaById(req.params.result_criteria_id);
    res.success(res, examResultCriteria);
  } catch (err) {
    res.error(res, err);
  }
};

const getExamResultCriteriasByResultId = async (req, res) => {
  try {
    const examResultCriterias = await examResultCriteriaService.getExamResultCriteriasByResultId(req.params.result_id);
    res.success(res, examResultCriterias);
  } catch (err) {
    res.error(res, err);
  }
};

const updateExamResultCriteria = async (req, res) => {
  try {
    const examResultCriteria = await examResultCriteriaService.updateExamResultCriteria(req.params.result_criteria_id, req.body);
    res.success(res, examResultCriteria);
  } catch (err) {
    res.error(res, err);
  }
};

const deleteExamResultCriteria = async (req, res) => {
  try {
    await examResultCriteriaService.deleteExamResultCriteria(req.params.result_criteria_id);
    res.success(res, { message: 'Exam result criteria deleted successfully' });
  } catch (err) {
    res.error(res, err);
  }
};

module.exports = {
  createExamResultCriteria,
  getExamResultCriteriaById,
  getExamResultCriteriasByResultId,
  updateExamResultCriteria,
  deleteExamResultCriteria
};