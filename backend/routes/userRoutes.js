const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

// Chỉ Admin mới có quyền truy cập
router.post('/', userController.createUser);
router.get('/:id', authMiddleware, userController.getUserById);
router.get('/name/:name', userController.getByUsername);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);
router.get('/users', authMiddleware, userController.getAllUsers);
//get user hiện tại
router.get('/currentUser', authMiddleware, userController.getCurrentUser);

// Route cho login, không cần authMiddleware
router.post('/login', userController.loginUser); 

module.exports = router;