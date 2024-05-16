const { User } = require('../models');
const db = require('../models');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        console.log('Fetched users:', JSON.stringify(users, null, 2)); // Log the users to console
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const [updatedRows, [updatedUser]] = await User.update(req.body, {
            where: { user_id: req.params.id },
            returning: true
        });
        if (updatedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedRows = await User.destroy({ where: { user_id: req.params.id } });
        if (deletedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(204).send(); // No content
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};
