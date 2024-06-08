const express = require('express');
const userController = require('../controllers/UserController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.get('/name/:name', userController.getByUsername);
router.post('/login', userController.loginUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;