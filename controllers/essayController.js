const { Essay, Exam } = require('../models');

exports.getEssays = async (req, res) => {
    try {
        const essays = await Essay.findAll();
        res.status(200).json(essays);
    } catch (err) {
        console.error('Error fetching essays:', err);
        res.status(500).json({ error: 'Failed to fetch essays' });
    }
};

exports.getEssayById = async (req, res) => {
    try {
        const essay = await Essay.findByPk(req.params.id);
        if (!essay) {
            return res.status(404).json({ error: 'Essay not found' });
        }
        res.status(200).json(essay);
    } catch (err) {
        console.error('Error fetching essay:', err);
        res.status(500).json({ error: 'Failed to fetch essay' });
    }
};

exports.createEssay = async (req, res) => {
    try {
        const newEssay = await Essay.create(req.body);
        res.status(201).json(newEssay);
    } catch (err) {
        console.error('Error creating essay:', err);
        res.status(500).json({ error: 'Failed to create essay' });
    }
};

exports.updateEssay = async (req, res) => {
    try {
        const [updatedRows, [updatedEssay]] = await Essay.update(req.body, {
            where: { essay_id: req.params.id },
            returning: true
        });
        if (updatedRows === 0) {
            return res.status(404).json({ error: 'Essay not found' });
        }
        res.status(200).json(updatedEssay);
    } catch (err) {
        console.error('Error updating essay:', err);
        res.status(500).json({ error: 'Failed to update essay' });
    }
};

exports.deleteEssay = async (req, res) => {
    try {
        const deletedRows = await Essay.destroy({ where: { essay_id: req.params.id } });
        if (deletedRows === 0) {
            return res.status(404).json({ error: 'Essay not found' });
        }
        res.status(204).send(); // No content
    } catch (err) {
        console.error('Error deleting essay:', err);
        res.status(500).json({ error: 'Failed to delete essay' });
    }
};