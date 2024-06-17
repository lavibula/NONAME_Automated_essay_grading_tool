const Teacher = require('../models/Teacher');
const TeacherService = require('../services/teacherService');
const Essay = require('../models/Essay');
const ExamResult = require('../models/ExamResult');
const ExamResultCriteria = require('../models/ExamResultCriteria');
const ExamQuestion = require('../models/ExamQuestion');


async function testGradeScore() {
  console.log('--- Test gradeScore ---');

  // Chấm điểm tổng kết cho học sinh
  const examId = 'E00001';
  const student = await TeacherService.autoGradeAllStudents(examId);
  console.log(student);
}

// --- Run tests ---

(async () => {
  await testGradeScore();
})();