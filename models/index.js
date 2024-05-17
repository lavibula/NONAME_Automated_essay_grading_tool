const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {
  host: config.database.host,
  dialect: config.database.dialect,
  logging: false
});

// Khởi tạo các mô hình
const User = require('./user')(sequelize, DataTypes);
const QuestionBank = require('./questionBank')(sequelize, DataTypes);
const Question = require('./question')(sequelize, DataTypes);
const Exam = require('./exam')(sequelize, DataTypes);
const Essay = require('./essay')(sequelize, DataTypes);
const ExamResults = require('./examResults')(sequelize, DataTypes);
const ExamQuestions = require('./examQuestion')(sequelize, DataTypes);

// Sync all defined models to the DB
// Sử dụng promise chaining để đảm bảo rằng các mô hình đã được khởi tạo trước khi gọi sync
sequelize.sync().then(() => {
  console.log('All models were synchronized successfully.');
}).catch(err => {
  console.error('An error occurred while synchronizing models:', err);
});

module.exports = {
  sequelize,
  User,
  QuestionBank,
  Question,
  Exam,
  Essay,
  ExamResults,
  ExamQuestions
};
