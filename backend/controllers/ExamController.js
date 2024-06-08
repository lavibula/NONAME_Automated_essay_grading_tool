const examService = require('../services/ExamService');

class ExamController {
  async createExam(req, res) {
    try {
      const exam = await examService.createExam(req.body);
      res.status(201).json(exam);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getExamById(req, res) {
    try {
      const exam = await examService.getExamById(req.params.id);
      if (exam) {
        res.status(200).json(exam);
      } else {
        res.status(404).json({ error: 'Exam not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getExamByName(req, res) {
    try {
      const name = req.query.name;
      if (name) {
        const exam = await examService.getExamByName(name);
        if (exam) {
          res.status(200).json(exam);
        } else {
          res.status(404).json({ error: 'Exam not found' });
        }
      } else {
        res.status(400).json({ error: 'Name is required' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateExam(req, res) {
    try {
      const updatedExam = await examService.updateExam(req.params.id, req.body);
      if (updatedExam) {
        res.status(200).json(updatedExam);
      } else {
        res.status(404).json({ error: 'Exam not found' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async deleteExam(req, res) {
    try {
      await examService.deleteExam(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async activateExam(req, res) {
    try {
      await examService.activateExam(req.params.id);
      res.status(200).json({ message: 'Exam activated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deactivateExam(req, res) {
    try {
      await examService.deactivateExam(req.params.id);
      res.status(200).json({ message: 'Exam deactivated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getExamsByCreated(req, res) {
    try {
      const exams = await examService.getExamsByCreated(req.params.user_id);
      response.success(res, exams);
    } catch (err) {
      response.error(res, err);
    }
  }
}

module.exports = new ExamController();