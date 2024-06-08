const essayService = require('../services/essayService');

const createEssay = async (req, res) => {
  try {
    const essay = await essayService.createEssay(req.body);
    res.status(201).json(essay);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getEssayById = async (req, res) => {
  try {
    const essay = await essayService.getEssayById(req.params.essay_id);
    res.status(200).json(essay);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getEssaysByExamId = async (req, res) => {
  try {
    const essays = await essayService.getEssaysByExamId(req.params.exam_id);
    res.status(200).json(essays);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getEssaysByStudentId = async (req, res) => {
  try {
    const essays = await essayService.getEssaysByStudentId(req.params.student_id);
    res.status(200).json(essays);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const updateEssay = async (req, res) => {
  try {
    const essay = await essayService.updateEssay(req.params.essay_id, req.body);
    res.status(200).json(essay);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteEssay = async (req, res) => {
  try {
    await essayService.deleteEssay(req.params.essay_id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const calculateScore = async (req, res) => {
  try {
    const score = await essayService.calculateScore(req.params.essay_id);
    res.status(200).json({ score });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getEssaysByStudentAndExamId = async (req, res) => {
  try {
    const essays = await essayService.getEssaysByStudentAndExamId(req.params.student_id, req.params.exam_id);
    res.status(200).json(essays);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  createEssay,
  getEssayById,
  getEssaysByExamId,
  getEssaysByStudentId,
  updateEssay,
  deleteEssay,
  calculateScore,
  getEssaysByStudentAndExamId
};
