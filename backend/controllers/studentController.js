const studentService = require('../services/studentService');
const teacherService = require('../services/teacherService');

const authMiddleware = require('../utils/auth');

class StudentController {
  async attendexam(req,res){
    const examId = req.params.exam_id;
    const exam = await teacherService.getExamById(examId);
    console.log(exam); // Ensure the exam data is correct
    res.render('attendexam', {
        style: 'attendexam.css',
        role: 'Học sinh',
        exam: exam,
        noSidebar:true,
    });
  }

  async mylibrarystudent(req,res){
    const exams = await teacherService.getAllExams();
    console.log(exams);
    res.status(200).render('mylibrarystudent',{
      style: 'mylibrarystudent.css',
      role: 'Học sinh',
      thu_muc_cau_hoi_s: exams
    })
  }


  // async submitEssay(req, res) {
  //   try {
  //     const essay = await studentService.submitEssay(req.body);
  //     res.status(201).json(essay);
  //   } catch (err) {
  //     res.status(400).json({ error: err.message });
  //   }
  // }
  // async submitEssay(req, res) {
  //   try {
  //     const studentId = req.user.user_id;
  //     const essayData = { ...req.body, studentId };
  //     const essay = await studentService.submitEssay(essayData);
  //     res.status(201).json(essay);
  //   } catch (err) {
  //     res.status(400).json({ error: err.message });
  //   }
  // }

  async submitEssay(req, res) {
    try {
      const { question_id } = req.params;
      const essay = req.body;
      console.log(essay);
      // If question_id is provided, assume it's a single question submission
      // if (question_id) {
      //   essay.examquestionId = question_id;
      // }
      console.log(essay);

      const result = await studentService.submitEssay(essay);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getExamResults(req, res) {
    try {
      const studentId = req.user.user_id; // Lấy ID của học sinh từ token
      const examId = req.params.id;
      const examResults = await studentService.getExamResults(studentId, examId);
      console.log(examResults);
      res.status(200).json(examResults);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new StudentController();