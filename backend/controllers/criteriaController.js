const criteriaService = require('../services/criteriaService');

const getAllCriterias = async (req, res) => {
  try {
    const criterias = await criteriaService.getAllCriterias();
    res.success(res, criterias);
  } catch (err) {
    res.error(res, err);
  }
};

const getCriteriaById = async (req, res) => {
  try {
    const criteria = await criteriaService.getCriteriaById(req.params.criteria_id);
    res.success(res, criteria);
  } catch (err) {
    res.error(res, err);
  }
};

const createCriteria = async (req, res) => {
  try {
    const criteria = await criteriaService.createCriteria(req.body);
    res.success(res, criteria);
  } catch (err) {
    res.error(res, err);
  }
};

const updateCriteria = async (req, res) => {
  try {
    const criteria = await criteriaService.updateCriteria(req.params.criteria_id, req.body);
    res.success(res, criteria);
  } catch (err) {
    res.error(res, err);
  }
};

const deleteCriteria = async (req, res) => {
  try {
    await criteriaService.deleteCriteria(req.params.criteria_id);
    res.success(res, { message: 'Criteria deleted successfully' });
  } catch (err) {
    res.error(res, err);
  }
};

module.exports = {
  getAllCriterias,
  getCriteriaById,
  createCriteria,
  updateCriteria,
  deleteCriteria
};