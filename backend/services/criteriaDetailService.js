const CriteriaDetail = require('../models/CriteriaDetail');

class CriteriaDetailService {
  async getAllCriteriaDetails() {
    return await CriteriaDetail.getAll();
  }

  async getCriteriaDetailById(detailId) {
    return await CriteriaDetail.getById(detailId);
  }

  async createCriteriaDetail(criteriaDetailData) {
    return await CriteriaDetail.create(criteriaDetailData);
  }

  async updateCriteriaDetail(detailId, criteriaDetailData) {
    return await CriteriaDetail.update(detailId, criteriaDetailData);
  }

  async deleteCriteriaDetail(detailId) {
    await CriteriaDetail.delete(detailId);
  }
}

module.exports = new CriteriaDetailService();