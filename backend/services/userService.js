const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcrypt');

const getAllUsers = async () => {
  const users = await User.getAll();
  return users;
};

const getUserById = async (userId) => {
  const user = await User.getById(userId);
  return user;
};

const getByUsername = async (userName) => {
  const user = await User.getByUsername(userName);
  return user;
};

const createUser = async (userData) => {
  userData.password = await User.hashPassword(userData.password);
  const user = await User.create(userData);
  return user;
};

const updateUser = async (userId, updatedData) => {
  if (updatedData.password) {
    updatedData.password = await User.hashPassword(updatedData.password);
  }
  const user = await User.update(userId, updatedData);
  return user;
};

const deleteUser = async (userId) => {
  await User.delete(userId);
};

const login = async (username, password) => {
  const user = await User.getByUsername(username);
  if (!user) {
    throw new Error('Invalid username');
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign({ user_id: user.userId, role: user.role }, config.secret, { expiresIn: '1h' });
  return token;
};

const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.getById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const isValidPassword = await bcrypt.compare(oldPassword, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid old password');
  }
  user.password = await User.hashPassword(newPassword);
  await User.update(userId, user);
};


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  changePassword,
  getByUsername,
};