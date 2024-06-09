const Teacher = require('../models/Teacher');
const Essay = require('../models/Essay');
const ExamResult = require('../models/ExamResult');
const ExamResultCriteria = require('../models/ExamResultCriteria');
const ExamQuestion = require('../models/ExamQuestion');
const Question = require('../models/Question');
const CriteriaDetail = require('../models/CriteriaDetail'); 
async function gradeEssay(essayId, teacherId) {
  try {
    // Lấy thông tin bài luận
    const essay = await Essay.getById(essayId);
    if (!essay) {
      throw new Error('Essay not found');
    }

    // Tính điểm bài luận
    const score = await Essay.calculateScore(essayId);

    // Lưu kết quả chấm điểm
    const gradedResult = await ExamResult.create({
      essayId: essayId,
      gradedBy: teacherId,
      score: score,
      gradedTime: new Date(), // Lưu thời gian chấm điểm hiện tại
    });

    // Lấy các tiêu chí của câu hỏi trong bài luận
    const examQuestions = await ExamQuestion.getByExamId(essay.examId);
    const question = await Question.getById(examQuestions[0].questionId); // Lấy câu hỏi đầu tiên trong đề thi
    const criteriaDetails = await CriteriaDetail.getByQuestionId(question.questionId);

    // Lưu kết quả tiêu chí chấm điểm
    await Promise.all(
      criteriaDetails.map(criteriaDetail =>
        ExamResultCriteria.create({
          resultId: gradedResult.resultId,
          criteriaId: criteriaDetail.criteriaId,
        })
      )
    );

    // Trả về kết quả chấm điểm
    return gradedResult;
  } catch (error) {
    console.error('Lỗi khi chấm điểm bài luận:', error);
    throw error;
  }
}

// Gọi hàm gradeEssay để chấm điểm một bài luận cụ thể
gradeEssay('ES00001', 'U00003').then(result => {
  console.log('Kết quả chấm điểm:', result);
}).catch(error => {
  console.error('Lỗi khi chấm điểm:', error);
});
