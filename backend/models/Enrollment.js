const db = require('../config/database');

class Enrollment {
  static async enrollStudent(studentId, examId) {
    try {
      const query = `
        INSERT INTO Enrollment (exam_id, student_id)
        VALUES ($1, $2)
        RETURNING enrollment_id
      `;
      const values = [examId, studentId];
      const result = await db.query(query, values);
      return result.rows[0].enrollment_id;
    } catch (error) {
      throw new Error(`Error enrolling student: ${error.message}`);
    }
  }

  static async getEnrollmentDetails(enrollmentId) {
    try {
      const query = `
        SELECT e.exam_title, e.description, e.start_time, e.end_time, e.duration,
               u.username, u.fullname
        FROM Enrollment er
        INNER JOIN Exam e ON er.exam_id = e.exam_id
        INNER JOIN Users u ON er.student_id = u.user_id
        WHERE er.enrollment_id = $1
      `;
      const values = [enrollmentId];
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error fetching enrollment details: ${error.message}`);
    }
  }
}

module.exports = Enrollment;
