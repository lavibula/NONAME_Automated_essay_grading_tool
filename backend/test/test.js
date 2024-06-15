const Teacher = require('../models/Teacher');
const Essay = require('../models/Essay');
const ExamResult = require('../models/ExamResult');
const ExamResultCriteria = require('../models/ExamResultCriteria');
const ExamQuestion = require('../models/ExamQuestion');


async function testGradeScore() {
  console.log('--- Test gradeScore ---');

  // Chấm điểm tổng kết cho học sinh
  const examId = 'E00001';
  const studentId = 'U00005';
  const gradedResult = await Teacher.gradeScore(examId, studentId);
  console.log(gradedResult);

  // Kiểm tra điểm được lưu vào ExamResult
  const examResult = await ExamResult.getByStudentAndExamId(studentId, examId);
  console.log(examResult);
  console.log('--- End Test gradeScore ---');
}

// --- Run tests ---

(async () => {
  await testGradeScore();
})();