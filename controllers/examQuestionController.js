const db = require('../models');

exports.getExamQuestions = async (req, res) => {
  try {
    const examQuestions = await db.ExamQuestions.findAll();
    res.status(200).json(examQuestions);
  } catch (error) {
    console.error('Error fetching exam questions:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

