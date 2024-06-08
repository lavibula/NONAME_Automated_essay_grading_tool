const criteriaDetailService = require('../services/criteriaDetailService');

const getAllCriteriaDetails = async (req, res) => {
  try {
    const criteriaDetails = await criteriaDetailService.getAllCriteriaDetails();
    res.success(res, criteriaDetails);
  } catch (err) {
    res.error(res, err);
  }
};

const getCriteriaDetailById = async (req, res) => {
  try {
    const criteriaDetail = await criteriaDetailService.getCriteriaDetailById(req.params.detail_id);
    res.success(res, criteriaDetail);
  } catch (err) {
    res.error(res, err);
  }
};

const createCriteriaDetail = async (req, res) => {
  try {
    const criteriaDetail = await criteriaDetailService.createCriteriaDetail(req.body);
    res.success(res, criteriaDetail);
  } catch (err) {
    res.error(res, err);
  }
};

const updateCriteriaDetail = async (req, res) => {
  try {
    const criteriaDetail = await criteriaDetailService.updateCriteriaDetail(req.params.detail_id, req.body);
    res.success(res, criteriaDetail);
  } catch (err) {
    res.error(res, err);
  }
};

const deleteCriteriaDetail = async (req, res) => {
  try {
    await criteriaDetailService.deleteCriteriaDetail(req.params.detail_id);
    res.success(res, { message: 'Criteria detail deleted successfully' });
  } catch (err) {
    res.error(res, err);
  }
};

module.exports = {
  getAllCriteriaDetails,
  getCriteriaDetailById,
  createCriteriaDetail,
  updateCriteriaDetail,
  deleteCriteriaDetail
};