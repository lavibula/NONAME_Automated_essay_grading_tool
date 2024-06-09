const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const QuestionBank = sequelize.define('QuestionBank', {
    bank_id: {
      type: DataTypes.STRING,  
      primaryKey: true
    },
    created_by: {
      type: DataTypes.STRING,  
      allowNull: true
    },
    bank_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bank_description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'QuestionBank',  
    timestamps: false  
  });

  return QuestionBank;
};
