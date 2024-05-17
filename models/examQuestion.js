const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ExamQuestion = sequelize.define('ExamQuestion', {
    exam_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    question_id: {
      type: DataTypes.STRING, 
      primaryKey: true
    },
    question_order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    question_score: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'ExamQuestion',
    timestamps: false
  });

  return ExamQuestion;
};
