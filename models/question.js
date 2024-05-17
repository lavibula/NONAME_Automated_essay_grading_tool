const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Question = sequelize.define('Question', {
    question_id: {
      type: DataTypes.STRING,  
      primaryKey: true
    },
    question_bank: {
      type: DataTypes.STRING,  
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'Question',
    timestamps: false
  });

  return Question;
};
