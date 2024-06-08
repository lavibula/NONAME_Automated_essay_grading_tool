const Criteria = require('../models/Criteria');

class CriteriaService {
  async getAllCriterias() {
    return await Criteria.getAll();
  }

  async getCriteriaById(criteriaId) {
    return await Criteria.getById(criteriaId);
  }

  async createCriteria(criteriaData) {
    return await Criteria.create(criteriaData);
  }

  async updateCriteria(criteriaId, criteriaData) {
    return await Criteria.update(criteriaId, criteriaData);
  }

  async deleteCriteria(criteriaId) {
    await Criteria.delete(criteriaId);
  }
}

module.exports = new CriteriaService();