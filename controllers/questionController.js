const { Question } = require('../models');

exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.findAll();
        res.status(200).json(questions);
    } catch (err) {
        console.error('Error fetching questions:', err);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
};

exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findByPk(req.params.id);
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.status(200).json(question);
    } catch (err) {
        console.error('Error fetching question:', err);
        res.status(500).json({ error: 'Failed to fetch question' });
    }
};

exports.createQuestion = async (req, res) => {
    try {
        const newQuestion = await Question.create(req.body);
        res.status(201).json(newQuestion);
    } catch (err) {
        console.error('Error creating question:', err);
        res.status(500).json({ error: 'Failed to create question' });
    }
};

exports.updateQuestion = async (req, res) => {
    try {
        const [updatedRows, [updatedQuestion]] = await Question.update(req.body, {
            where: { question_id: req.params.id },
            returning: true
        });
        if (updatedRows === 0) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.status(200).json(updatedQuestion);
    } catch (err) {
        console.error('Error updating question:', err);
        res.status(500).json({ error: 'Failed to update question' });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        const deletedRows = await Question.destroy({ where: { question_id: req.params.id } });
        if (deletedRows === 0) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.status(204).send(); // No content
    } catch (err) {
        console.error('Error deleting question:', err);
        res.status(500).json({ error: 'Failed to delete question' });
    }
};
