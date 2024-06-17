const groupLeaderService = require('../services/groupLeaderService');
const authMiddleware = require('../utils/auth');
const CriteriaDetail = require('../models/CriteriaDetail');

class GroupLeaderController {
  async createQuestionBank(req, res) {
    try {
      const questionBank = await groupLeaderService.createQuestionBank(req.body);
      res.status(201).json(questionBank);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getQuestionBankById(req, res) {
    try {
      const questionBank = await groupLeaderService.getQuestionBankById(req.params.id);
      if (questionBank) {
        res.status(200).json(questionBank);
      } else {
        res.status(404).json({ error: 'Question bank not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateQuestionBank(req, res) {
    try {
      const updatedQuestionBank = await groupLeaderService.updateQuestionBank(req.params.id, req.body);
      if (updatedQuestionBank) {
        res.status(200).json(updatedQuestionBank);
      } else {
        res.status(404).json({ error: 'Question bank not found' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async deleteQuestionBank(req, res) {
    try {
      await groupLeaderService.deleteQuestionBank(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async getAllQuestionBanks(req, res) {
    try {
      const questionBanks = await groupLeaderService.getAllQuestionBanks();
      res.status(200).json(questionBanks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

   async createCriteriaDetail(req, res) {
    try {
      const criteriaDetailData = req.body;
      const createdCriteriaDetail = await groupLeaderService.createCriteriaDetail(criteriaDetailData);
      res.status(201).json(createdCriteriaDetail);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getCriteriaDetailById(req, res) {
    const { detailId } = req.params;
    try {
      const criteriaDetail = await CriteriaDetail.getById(detailId);
      if (!criteriaDetail) {
        return res.status(404).json({ error: `Criteria detail with ID ${detailId} not found.` });
      }
      res.status(200).json(criteriaDetail);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAllCriteriaDetails(req, res) {
    try {
      const criteriaDetails = await CriteriaDetail.getAll();
      res.status(200).json(criteriaDetails);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateCriteriaDetail(req, res) {
    const { detailId } = req.params;
    const updatedCriteriaDetail = req.body; 
    try {
      const result = await CriteriaDetail.update(detailId, updatedCriteriaDetail);
      if (!result) {
        return res.status(404).json({ error: `Criteria detail with ID ${detailId} not found.` });
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async  deleteCriteriaDetail(req, res) {
    const { detailId } = req.params;
    try {
      await CriteriaDetail.delete(detailId);
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new GroupLeaderController();