const studentService = require('../services/studentService');
const authMiddleware = require('../utils/auth');

class StudentController {
  async mylibrarystudent(req,res){
    res.render('mylibrarystudent',{
      style: 'mylibrarystudent.css'
    })
  }
  async submitEssay(req, res) {
    try {
      const essay = await studentService.submitEssay(req.body);
      res.status(201).json(essay);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getExamResults(req, res) {
    try {
      const studentId = req.user.user_id; // Lấy ID của học sinh từ token
      const examId = req.params.id;
      const examResults = await studentService.getExamResults(studentId, examId);
      console.log(studentId);
      res.status(200).json(examResults);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new StudentController();