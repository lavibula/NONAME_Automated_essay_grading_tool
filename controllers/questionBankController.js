const { QuestionBank } = require('../models');

exports.getQuestionBanks = async (req, res) => {
    try {
        const questionBanks = await QuestionBank.findAll();
        res.status(200).json(questionBanks);
    } catch (err) {
        console.error('Error fetching question banks:', err);
        res.status(500).json({ error: 'Failed to fetch question banks' });
    }
};

exports.getQuestionBankById = async (req, res) => {
    try {
        const questionBank = await QuestionBank.findByPk(req.params.id);
        if (!questionBank) {
            return res.status(404).json({ error: 'Question bank not found' });
        }
        res.status(200).json(questionBank);
    } catch (err) {
        console.error('Error fetching question bank:', err);
        res.status(500).json({ error: 'Failed to fetch question bank' });
    }
};

exports.createQuestionBank = async (req, res) => {
    try {
        const newQuestionBank = await QuestionBank.create(req.body);
        res.status(201).json(newQuestionBank);
    } catch (err) {
        console.error('Error creating question bank:', err);
        res.status(500).json({ error: 'Failed to create question bank' });
    }
};

exports.updateQuestionBank = async (req, res) => {
    try {
        const [updatedRows, [updatedQuestionBank]] = await QuestionBank.update(req.body, {
            where: { bank_id: req.params.id },
            returning: true
        });
        if (updatedRows === 0) {
            return res.status(404).json({ error: 'Question bank not found' });
        }
        res.status(200).json(updatedQuestionBank);
    } catch (err) {
        console.error('Error updating question bank:', err);
        res.status(500).json({ error: 'Failed to update question bank' });
    }
};

exports.deleteQuestionBank = async (req, res) => {
    try {
        const deletedRows = await QuestionBank.destroy({ where: { bank_id: req.params.id } });
        if (deletedRows === 0) {
            return res.status(404).json({ error: 'Question bank not found' });
        }
        res.status(204).send(); // No content
    } catch (err) {
        console.error('Error deleting question bank:', err);
        res.status(500).json({ error: 'Failed to delete question bank' });
    }
};