const teacherService = require('../services/teacherService');
const authMiddleware = require('../utils/auth');

class TeacherController {
  async createExam(req, res) {
    try {
      req.body.createdBy = req.user.user_id;
      console.log(req.body);
      const exam = await teacherService.createExam(req.body);
      res.status(201).json(exam);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

   async createCriteria(req, res) {
    try {
      const criteriaData = req.body;
      const createdCriteria = await teacherService.createCriteria(criteriaData);
      res.status(201).json(createdCriteria);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getCriteriaByQuestionId(req, res) {
    try {
      const questionId = req.params.questionId;
      const criteria = await teacherService.getCriteriaByQuestionId(questionId);
      if (!criteria) {
        return res.status(404).json({ error: 'Criteria not found for this question.' });
      }
      res.status(200).json(criteria);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateCriteriaDetailWeight(req, res) {
    const detailId = req.params.detailId;
    const { weight } = req.body;
    try {
      const updatedDetail = await teacherService.updateCriteriaDetailWeight(detailId, weight);
      res.status(200).json(updatedDetail);
    } catch (error) {
      console.error('Error updating criteria detail weight:', error);
      res.status(500).json({ error: 'Failed to update criteria detail weight.' });
    }
  }


  async getExamById(req, res) {
    try {
      const exam = await teacherService.getExamById(req.params.id);
      if (exam) {
        res.status(200).json(exam);
      } else {
        res.status(404).json({ error: 'Exam not found' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteExam(req, res) {
    try {
      await teacherService.deleteExam(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async gradeScore(req, res) {
    try {
      const examId = req.params.examId;
      const studentId = req.params.studentId;
      const examResult = await teacherService.gradeScore(examId, studentId);
      res.status(200).json({ message: 'Essay graded successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  async addQuestionToExam(req, res) {
    try {
      const examId = req.params.examId;
      const questionId = req.body.questionId;
      const maxScore = req.body.maxScore;
      await teacherService.addQuestionToExam(examId, questionId, maxScore);
      res.status(200).json({ message: 'Question added to exam successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAllExams(req, res) {
    try {
      const exams = await teacherService.getAllExams();
      res.status(200).json(exams);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getQuestionsByQuestionBankId(req, res) {
    try {
      const { questionBankId } = req.params;
      const questions = await teacherService.getQuestionsByQuestionBankId(questionBankId);
      if (questions) {
        res.status(200).json(questions);
      } else {
        res.status(404).json({ error: 'No questions found for this question bank' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAllQuestionBanks(req, res) {
    try {
      const questionBanks = await teacherService.getAllQuestionBanks();
      res.status(200).json(questionBanks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAllStudentsByExamId(req, res) {
    try {
      const examId = req.params.id;
      console.log(`Received examId: ${examId}`);
      const student = await teacherService.getAllStudentsByExamId(examId);
      res.status(200).json(student);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async  autoGradeAllStudents(req, res) {
    try {
      const { examId } = req.params;
  
      const students = await teacherService.getAllStudentsByExamId(examId);
  
      if (students.length === 0) {
        return res.status(404).json({ message: `No students found for exam ${examId}.` });
      }
  
      const gradingLog = [];
      for (const student of students) {
        const studentId = student.student_id;
        try {
          await teacherService.gradeScore(examId, studentId);
          gradingLog.push(`Graded exam for student ${studentId} in exam ${examId}.`);
        } catch (error) {
          console.error(`Failed to grade exam for student ${studentId} in exam ${examId}: ${error.message}`);
          gradingLog.push(`Failed to grade exam for student ${studentId} in exam ${examId}: ${error.message}`);
        }
      }
  
      const results = await teacherService.getResultByExamId(examId);
  
      res.status(200).json({
        message: 'Automatic grading completed successfully.',
        log: gradingLog,
        results: results
      });
    } catch (err) {
      console.error(`Error while grading students for exam ${examId}: ${err.message}`);
      res.status(500).json({ error: err.message });
    }
  }

  async getResultByExamId(req, res) {
    try {
      const examId = req.params.examId;
      const results = await teacherService.getResultByExamId(examId);
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getResultByStudentId(req, res) {
    try {
      const studentId = req.params.studentId;
      const results = await teacherService.getResultByStudentId(studentId);
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new TeacherController();