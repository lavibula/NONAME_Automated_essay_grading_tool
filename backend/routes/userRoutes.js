const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../utils/auth');

const router = express.Router();

// Chỉ Admin mới có quyền truy cập
router.post('/admin/users', userController.createUser);
router.get('/admin/users/:id', authMiddleware, userController.getUserById);
router.put('/admin/users/:id', authMiddleware, userController.updateUser);
router.delete('/admin/users/:id', authMiddleware, userController.deleteUser);
router.get('/admin/users', authMiddleware, userController.getAllUsers);
//get user hiện tại
router.get('/users/me', authMiddleware, userController.getCurrentUser);
router.get('/users/name/:name', userController.getByUsername);

// Route cho login, không cần authMiddleware
router.post('/users/login', userController.loginUser); 

module.exports = router;