const Teacher = require('../models/Teacher');
const Essay = require('../models/Essay');
const ExamResult = require('../models/ExamResult');
const ExamResultCriteria = require('../models/ExamResultCriteria');
const ExamQuestion = require('../models/ExamQuestion');


async function testGradeScore() {
  console.log('--- Test gradeScore ---');

  // Chấm điểm tổng kết cho học sinh
  const examId = 'E00001';
  const student = await Teacher.getAllStudentsByExamId(examId);
  console.log(student);
}

// --- Run tests ---

(async () => {
  await testGradeScore();
})();