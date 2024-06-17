const Student = require('../models/Student');
const Enrollment = require('../models/Enrollment');
class StudentService {
  async submitEssay(essayData) {
    return await Student.submitEssay(essayData);
  }

  async getExamResults(studentId, examId) {
    return await Student.getExamResults(studentId, examId);
  }
  async getAllExams(studentId) {
    return await Student.getAllExams(studentId);
  }

  async getUnsubmittedExams(studentId) {
    return await Student.getUnsubmittedExams(studentId);
  }

  async enrollStudent(studentId, examId) {
    try {
      const enrollment = await Enrollment.enrollStudent(studentId, examId); 
      return enrollment; 
    } catch (err) {
      throw new Error(`Failed to enroll student: ${err.message}`);
    }
  }

  async getDetailEnrollment(enrollmentId) {
    try {
      const enrollmentDetail = await Enrollment.getEnrollmentDetails(enrollmentId);
      return enrollmentDetail; 
    } catch (err) {
      throw new Error(`Failed to get enrollment detail: ${err.message}`);
    }
  }
}

module.exports = new StudentService();