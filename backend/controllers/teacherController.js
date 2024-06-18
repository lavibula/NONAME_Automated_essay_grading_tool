const teacherService = require('../services/teacherService');
const authMiddleware = require('../utils/auth');

class TeacherController {
  async mylibrarypublic(req,res){
    const exams = await teacherService.getAllExams();
    res.render('mylibraryteacher',{
      style: 'mylibraryteacher.css',
      role: 'Giáo viên',
      thu_muc_cau_hoi_s: exams
    })
  }async mylibrarygrading(req,res){
    const exams = await teacherService.getAllExams();
    
    res.render('listofgrading',{
      style: 'mylibraryteacher.css',
      role: 'Giáo viên',
      thu_muc_cau_hoi_s: exams
    })
  }
  async createtestui(req,res){
    res.render('createtest',{
      style: 'teacher/createtest.css',
      role:'Giáo viên',
    })
  }
  async gradingui(req, res) {
      try {
          const examId = req.params.examId; // or req.params.examId if passed as a route parameter
          const students = await teacherService.getAllStudentsByExamId(examId);
          const exam = await teacherService.getExamById(examId);
          const result = await teacherService.getResultByExamId(examId); 
          const numberOfQuestions = exam.questions.length;
          // students.score = results.total_score;
          res.render('autograde', {
              style: 'sohm/autograde.css',
              role:'Giáo viên',
              students: students, // Passing the fetched students to the template
              examId: examId,
              exam:exam,
              numberOfQuestions:numberOfQuestions,
              score: result
          });
      } catch (error) {
          console.error('Error fetching student data:', error);
          res.status(500).send('Error fetching data');
      }
  }

  async createExam(req, res) {
    try {
      req.body.createdBy = req.user.user_id;
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
      const student = await teacherService.getAllStudentsByExamId(examId);
      res.status(200).json(student);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


  async autoGradeAllStudents(req, res) {
    try {
      const { examId } = req.params;
      const gradingLog = await teacherService.autoGradeAllStudents(examId);
      const results = await teacherService.getResultByExamId(examId);
      res.status(200).json({
        message: 'Automatic grading completed successfully.',
        log: gradingLog,
        results: results
      });
    } catch (err) {
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