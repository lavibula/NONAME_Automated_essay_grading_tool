const { DataTypes } = require('sequelize');
const sequelize = require('../config/config').database;

module.exports = (sequelize) => {
const Essay = sequelize.define('Essay', {
  essay_id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  question_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  exam_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  student_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  essay_content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  submitted_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
},
{
  tableName: 'Essay',
  timestamps: false
});

return Essay;
};