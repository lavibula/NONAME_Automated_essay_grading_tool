const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Exam = sequelize.define('Exam', {
    exam_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    created_by: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    exam_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    exam_password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'Exam',
    timestamps: false
  });

  return Exam;
};
