const essayService = require('../services/essayService');
const authMiddleware = require('../utils/auth');

class EssayController {
  async createEssay(req, res) {
    try {
      const essay = await essayService.createEssay(req.body);
      res.status(201).json(essay);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getEssayById(req, res) {
    try {
      const essay = await essayService.getEssayById(req.params.id);
      if (essay) {
        res.status(200).json(essay);
      } else {
        res.status(404).json({ error: 'Essay not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getEssaysByExamId(req, res) {
    try {
      const essays = await essayService.getEssaysByExamId(req.params.id);
      res.status(200).json(essays);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getEssaysByStudentId(req, res) {
    try {
      const essays = await essayService.getEssaysByStudentId(req.params.id);
      res.status(200).json(essays);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateEssay(req, res) {
    try {
      const updatedEssay = await essayService.updateEssay(req.params.id, req.body);
      if (updatedEssay) {
        res.status(200).json(updatedEssay);
      } else {
        res.status(404).json({ error: 'Essay not found' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async deleteEssay(req, res) {
    try {
      await essayService.deleteEssay(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async getEssaysByStudentAndExamId(req, res) {
    try {
      const studentId = req.user.user_id; // Lấy ID của học sinh từ token
      const examId = req.params.id;
      const essays = await essayService.getEssaysByStudentAndExamId(studentId, examId);
      res.status(200).json(essays);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new EssayController();