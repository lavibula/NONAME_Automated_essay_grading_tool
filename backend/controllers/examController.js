const { Exam } = require('../models');

exports.getExams = async (req, res) => {
    try {
        const exams = await Exam.findAll();
        res.status(200).json(exams);
    } catch (err) {
        console.error('Error fetching exams:', err);
        res.status(500).json({ error: 'Failed to fetch exams' });
    }
};

exports.getExamById = async (req, res) => {
    try {
        const exam = await Exam.findByPk(req.params.id);
        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }
        res.status(200).json(exam);
    } catch (err) {
        console.error('Error fetching exam:', err);
        res.status(500).json({ error: 'Failed to fetch exam' });
    }
};

exports.createExam = async (req, res) => {
    try {
        const newExam = await Exam.create(req.body);
        res.status(201).json(newExam);
    } catch (err) {
        console.error('Error creating exam:', err);
        res.status(500).json({ error: 'Failed to create exam' });
    }
};

exports.updateExam = async (req, res) => {
    try {
        const [updatedRows, [updatedExam]] = await Exam.update(req.body, {
            where: { exam_id: req.params.id },
            returning: true
        });
        if (updatedRows === 0) {
            return res.status(404).json({ error: 'Exam not found' });
        }
        res.status(200).json(updatedExam);
    } catch (err) {
        console.error('Error updating exam:', err);
        res.status(500).json({ error: 'Failed to update exam' });
    }
};

exports.deleteExam = async (req, res) => {
    try {
        const deletedRows = await Exam.destroy({ where: { exam_id: req.params.id } });
        if (deletedRows === 0) {
            return res.status(404).json({ error: 'Exam not found' });
        }
        res.status(204).send(); // No content
    } catch (err) {
        console.error('Error deleting exam:', err);
        res.status(500).json({ error: 'Failed to delete exam' });
    }
};