const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ExamResults = sequelize.define('ExamResults', {
    result_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    essay_id: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    criteria_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'ExamResults',
    timestamps: false
  });

  return ExamResults;
};
