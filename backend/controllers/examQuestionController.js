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

exports.getExamQuestionsById = async (req, res) => {
  try {
      const examQuestions = await db.ExamQuestions.findAll({
          where: { exam_id: req.params.id }
      });
      if (!examQuestions || examQuestions.length === 0) {
          return res.status(404).json({ error: 'Exam not found' });
      }
      res.status(200).json(examQuestions);
  } catch (err) {
      console.error('Error fetching exam:', err);
      res.status(500).json({ error: 'Failed to fetch exam' });
  }
};

exports.createExam = async (req, res) => {
  const { exam_id, questions } = req.body; 

  if (!exam_id || !Array.isArray(questions)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    await db.sequelize.transaction(async (t) => {
      const exam = await db.Exam.create({ exam_id }, { transaction: t });

      const examQuestions = questions.map((question) => ({
        exam_id: exam.exam_id,
        question_id: question.question_id,
        question_order: question.question_order,
        question_score: question.question_score,
      }));

      await db.ExamQuestions.bulkCreate(examQuestions, { transaction: t });
    });

    res.status(201).json({ message: 'Exam created successfully' });
  } catch (err) {
    console.error('Error creating exam:', err);
    res.status(500).json({ error: 'Failed to create exam' });
  }
};

exports.updateExam = async (req, res) => {
  const { exam_id } = req.params;
  const { questions } = req.body; 

  if (!Array.isArray(questions)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    await db.sequelize.transaction(async (t) => {
      await db.ExamQuestions.destroy({ where: { exam_id }, transaction: t });

      const examQuestions = questions.map((question) => ({
        exam_id,
        question_id: question.question_id,
        question_order: question.question_order,
        question_score: question.question_score,
      }));

      await db.ExamQuestions.bulkCreate(examQuestions, { transaction: t });
    });

    res.status(200).json({ message: 'Exam updated successfully' });
  } catch (err) {
    console.error('Error updating exam:', err);
    res.status(500).json({ error: 'Failed to update exam' });
  }
};

exports.deleteExam = async (req, res) => {
  const { exam_id } = req.params;

  try {
    await db.sequelize.transaction(async (t) => {
      await db.ExamQuestions.destroy({ where: { exam_id }, transaction: t });
      await db.Exam.destroy({ where: { exam_id }, transaction: t });
    });

    res.status(200).json({ message: 'Exam deleted successfully' });
  } catch (err) {
    console.error('Error deleting exam:', err);
    res.status(500).json({ error: 'Failed to delete exam' });
  }
};
