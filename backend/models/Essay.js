const db = require('../config/database');
const ExamQuestion = require('./ExamQuestion');
const Question = require('./Question');
const CriteriaDetail = require('./CriteriaDetail');
const ExamResult = require('./ExamResult'); // Thêm model ExamResult
const ExamResultCriteria = require('./ExamResultCriteria');
class Essay {
  constructor(essayId, examquestionId, studentId, essayContent, submitTime) {
    this.essayId = essayId;
    this.examquestionId = examquestionId;
    this.studentId = studentId;
    this.essayContent = essayContent;
    this.submitTime = submitTime;
  }

  static async create(essay) {
    const submitTime = new Date();
    const query = `INSERT INTO Essay (examquestion_id, student_id, essay_content, submit_time) VALUES ($1, $2, $3, $4) RETURNING "essay_id", "examquestion_id", "student_id", "essay_content", "submit_time"`;
    const values = [essay.examquestionId, essay.studentId, essay.essayContent, submitTime];
    const result = await db.query(query, values);
    return new Essay(
      result.rows[0].essay_id,
      result.rows[0].examquestion_id,
      result.rows[0].student_id,
      result.rows[0].essay_content,
      result.rows[0].submit_time
    );
  }

  static async getById(essayId) {
    const query = 'SELECT * FROM Essay WHERE "essay_id" = $1';
    const values = [essayId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return new Essay(
        result.rows[0].essay_id,
        result.rows[0].examquestion_id,
        result.rows[0].student_id,
        result.rows[0].essay_content,
        result.rows[0].submit_time
      );
    }
    return null;
  }

   static async findAllEssay(examId, studentId){
      const query = `SELECT es.essay_id, es.examquestion_id, es.student_id, es.essay_content, es.submit_time
                FROM Exam e
                JOIN ExamQuestion eq ON e.exam_id = eq.exam_id
                JOIN Essay es ON eq.examquestion_id = es.examquestion_id
                WHERE e.exam_id = $1 AND es.student_id = $2`;
        const values = [examId, studentId];
        const result = await db.query(query, values);
        if (result.rows.length > 0) {
          return result.rows.map((row) => new Essay(
            row.essay_id,
            row.examquestion_id,
            row.student_id,
            row.essay_content,
            row.submit_time
          ));
        }
        return null;                  
  }

  static async getCriteria(essayId){
    const query = `SELECT cd.detail_id, cd.question_id, cd.criteria_id, cd.wordcount, cd.contain_phrase, cd.threshold, cd.weight
                  FROM Essay es
                  JOIN ExamQuestion eq ON es.examquestion_id = eq.examquestion_id
                  JOIN Question q ON eq.question_id = q.question_id
                  JOIN CriteriaDetail cd ON q.question_id = cd.question_id
                  WHERE es.essay_id = $1`;
    const values = [essayId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      return result.rows.map((row) => new CriteriaDetail(
        row.detail_id,
        row.question_id,
        row.criteria_id,
        row.wordcount,
        row.contain_phrase,
        row.threshold,
        row.weight
      ));
    }
    return null; 
  }

  static async getMaxScore(detailId){
    const query = `SELECT eq.examquestion_id, eq.exam_id, eq.question_id, eq.max_score
                  FROM CriteriaDetail cd
                  JOIN Question q ON cd.question_id = q.question_id
                  JOIN ExamQuestion eq ON q.question_id = eq.question_id
                  WHERE cd.detail_id = $1`;
    const values = [detailId];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
    return new ExamQuestion(
      result.rows[0].examquestion_id,
      result.rows[0].exam_id,
      result.rows[0].question_id,
      result.rows[0].max_score
      );
    }
    return null;
  }

  static async calculateScore(essayId) {
    const essay = await Essay.getById(essayId);
    if (!essay) {
      throw new Error('Essay not found');
    }
    const essayContent = essay.essayContent;
    // Lấy danh sách tiêu chí cho bài luận
    const criteriaDetails = await Essay.getCriteria(essayId);
    if (!criteriaDetails) {
      throw new Error('Criteria Detail not found');
    }
    for (const criteriaDetail of criteriaDetails) {
      let criteriaScore = 0; // Khai báo biến criteriaScore trong vòng lặp
      const maxScore = await Essay.getMaxScore(criteriaDetail.detailId);
      if (criteriaDetail.criteriaId === 'C001' || criteriaDetail.criteriaId === 'C002') { // Contains phrase hoặc Count contains phrase
        // Tách các cụm từ
        const phrases = criteriaDetail.containPhrase.split(','); 
        // Duyệt qua mỗi cụm từ và kiểm tra xem có trong bài luận không
        for (const phrase of phrases) {
          const phraseCount = (essayContent.match(new RegExp(phrase.trim(), 'gi')) || []).length;
          if (phraseCount > 0) {
            criteriaScore++;
          }
        }
        // Tính điểm theo tỷ lệ (số cụm từ trong bài luận / tổng số cụm từ trong đề bài)
        criteriaScore = (maxScore.maxScore / phrases.length) * criteriaScore ;
        
        // Kiểm tra xem có đủ số lượng cụm từ hay không (cho tiêu chí C002)
        if (criteriaDetail.criteriaId === 'C002') {
          criteriaScore = criteriaScore >= criteriaDetail.threshold ? maxScore.maxScore : 0; 
        }
      } else if (criteriaDetail.criteriaId === 'C003') { // Longer than
        const wordCount = essayContent.split(/\s+/).length;
        criteriaScore = wordCount >= criteriaDetail.wordcount ? maxScore.maxScore : 0;
      }

      // Cập nhật điểm cho từng tiêu chí vào ExamResultCriteria
      const existingCriteriaResult = await ExamResultCriteria.getByResultId(essay.essayId);
      const criteriaResult = existingCriteriaResult.find(result => result.detailId === criteriaDetail.detailId);
      if (criteriaResult) {
        await ExamResultCriteria.update(criteriaResult.resultCriteriaId, { score: criteriaScore });
      } else {
        await ExamResultCriteria.create({
          essayId: essay.essayId,
          detailId: criteriaDetail.detailId,
          score: criteriaScore,
        });
      }
    }

    return; // Không cần trả về điểm tổng kết
  }
}

module.exports = Essay;