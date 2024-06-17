DROP TABLE IF EXISTS ExamResultCriteria;
DROP TABLE IF EXISTS ExamResult;
DROP TABLE IF EXISTS Essay;
DROP TABLE IF EXISTS ExamQuestion;
DROP TABLE IF EXISTS Enrollment;
DROP TABLE IF EXISTS Exam;
DROP TABLE IF EXISTS CriteriaDetail;
DROP TABLE IF EXISTS Criteria;
DROP TABLE IF EXISTS Question;
DROP TABLE IF EXISTS QuestionBank;
DROP TABLE IF EXISTS Users;

DROP SEQUENCE IF EXISTS examresultcriteria_id_seq;
DROP SEQUENCE IF EXISTS examresult_id_seq;
DROP SEQUENCE IF EXISTS essay_id_seq;
DROP SEQUENCE IF EXISTS examquestion_id_seq;
DROP SEQUENCE IF EXISTS exam_id_seq;
DROP SEQUENCE IF EXISTS criteriadetail_id_seq;
DROP SEQUENCE IF EXISTS criteria_id_seq;
DROP SEQUENCE IF EXISTS question_id_seq;
DROP SEQUENCE IF EXISTS questionbank_id_seq;
DROP SEQUENCE IF EXISTS user_id_seq;

DROP FUNCTION IF EXISTS update_enrollment_after_essay() CASCADE;
DROP FUNCTION IF EXISTS before_insert_exam_result_criteria() CASCADE;
DROP FUNCTION IF EXISTS before_insert_exam_result() CASCADE;
DROP FUNCTION IF EXISTS before_insert_essay() CASCADE;
DROP FUNCTION IF EXISTS before_insert_exam_question() CASCADE;
DROP FUNCTION IF EXISTS before_insert_exam() CASCADE;
DROP FUNCTION IF EXISTS before_insert_criteria_detailed() CASCADE;
DROP FUNCTION IF EXISTS before_insert_question() CASCADE;
DROP FUNCTION IF EXISTS before_insert_question_bank() CASCADE;
DROP FUNCTION IF EXISTS before_insert_users() CASCADE;



-- Creating sequences for generating IDs
CREATE SEQUENCE user_id_seq;
CREATE SEQUENCE questionbank_id_seq;
CREATE SEQUENCE question_id_seq;
CREATE SEQUENCE criteria_id_seq;
CREATE SEQUENCE criteriadetail_id_seq;
CREATE SEQUENCE exam_id_seq;
CREATE SEQUENCE examquestion_id_seq;
CREATE SEQUENCE essay_id_seq;
CREATE SEQUENCE examresult_id_seq;
CREATE SEQUENCE examresultcriteria_id_seq;

-- Creating Criteria table
CREATE TABLE Criteria (
    criteria_id VARCHAR(4) PRIMARY KEY,
    criteria_name VARCHAR(30) NOT NULL CHECK (criteria_name IN ('contains phrase', 'count contains phrase', 'longer than'))
    );

-- Inserting data into Criteria table
INSERT INTO Criteria (criteria_id, criteria_name) VALUES
('C001', 'contains phrase'),
('C002', 'count contains phrase'),
('C003', 'longer than');

-- Creating Users table
CREATE TABLE Users (
    user_id VARCHAR(10) PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL, --Tên đăng nhập của người dùng (Dạng email))
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('Admin', 'Group Leader', 'Teacher', 'Student')),    
    fullname VARCHAR(255),
    birthday DATE,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('Male', 'Female'))
);

-- Trigger for generating user_id
CREATE OR REPLACE FUNCTION before_insert_users()
RETURNS TRIGGER AS $$
BEGIN
    NEW.user_id := 'U' || LPAD(nextval('user_id_seq')::TEXT, 5, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_users_trigger
BEFORE INSERT ON Users
FOR EACH ROW
EXECUTE FUNCTION before_insert_users();

-- Creating QuestionBank table
CREATE TABLE QuestionBank (
    bank_id VARCHAR(10) PRIMARY KEY,
    bank_name VARCHAR(255) NOT NULL,
    description TEXT,
    created_by VARCHAR(10),

    FOREIGN KEY (created_by) REFERENCES Users(user_id)
);

-- Trigger for generating bank_id
CREATE OR REPLACE FUNCTION before_insert_question_bank()
RETURNS TRIGGER AS $$
BEGIN
    NEW.bank_id := 'QB' || LPAD(nextval('questionbank_id_seq')::TEXT, 5, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_question_bank_trigger
BEFORE INSERT ON QuestionBank
FOR EACH ROW
EXECUTE FUNCTION before_insert_question_bank();

-- Creating Question table
CREATE TABLE Question (
    question_id VARCHAR(10) PRIMARY KEY,
    bank_id VARCHAR(10), --ID của ngân hàng câu hỏi chứa câu hỏi này.
    question_content TEXT NOT NULL,
    FOREIGN KEY (bank_id) REFERENCES QuestionBank(bank_id)
);

-- Trigger for generating question_id
CREATE OR REPLACE FUNCTION before_insert_question()
RETURNS TRIGGER AS $$
BEGIN
    NEW.question_id := 'Q' || LPAD(nextval('question_id_seq')::TEXT, 5, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_question_trigger
BEFORE INSERT ON Question
FOR EACH ROW
EXECUTE FUNCTION before_insert_question();

-- Creating CriteriaDetail table
CREATE TABLE CriteriaDetail (
    detail_id VARCHAR(10) PRIMARY KEY,
    question_id VARCHAR(10),
    criteria_id VARCHAR(4), --Loại tiêu chí từ bảng Criteria (longer than, count contains phrase, contain pharse)
    wordcount INT, --Số lượng từ tối thiểu cho tiêu chí longer than.
    contain_phrase VARCHAR(255), --Cụm từ được sử dụng cho tiêu chí contains phrase/count contains phrase.
    threshold INT, --Số lượng cụm từ tối thiểu phải có cho tiêu chí count contains phrase.
    weight DECIMAL(4,2) NOT NULL DEFAULT 1.0, -- Trọng số của tiêu chí, mặc định 1.0 nếu như chỉ có 1 tiêu chí chấm cho 1 câu hỏi, nhiều hơn 1 tiêu chí thì weight dùng xác định điểm dựa trên tiêu chí
    FOREIGN KEY (question_id) REFERENCES Question(question_id),
    FOREIGN KEY (criteria_id) REFERENCES Criteria(criteria_id)
);

-- Trigger for generating detail_id
CREATE OR REPLACE FUNCTION before_insert_criteria_detailed()
RETURNS TRIGGER AS $$
BEGIN
    NEW.detail_id := 'CD' || LPAD(nextval('criteriadetail_id_seq')::TEXT, 5, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_criteria_detailed_trigger
BEFORE INSERT ON CriteriaDetail
FOR EACH ROW
EXECUTE FUNCTION before_insert_criteria_detailed();

-- Creating Exam table
CREATE TABLE Exam (
    exam_id VARCHAR(10) PRIMARY KEY,
    exam_title VARCHAR(255) NOT NULL,
    description TEXT,
	start_time TIMESTAMP, -- Thời gian bắt đầu bài kiểm tra
    end_time TIMESTAMP,   -- Thời gian kết thúc bài kiểm tra
    created_by VARCHAR(10),
    FOREIGN KEY (created_by) REFERENCES Users(user_id)
);

-- Trigger for generating exam_id
CREATE OR REPLACE FUNCTION before_insert_exam()
RETURNS TRIGGER AS $$
BEGIN
    NEW.exam_id := 'E' || LPAD(nextval('exam_id_seq')::TEXT, 5, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_exam_trigger
BEFORE INSERT ON Exam
FOR EACH ROW
EXECUTE FUNCTION before_insert_exam();

-- Creating ExamQuestion table
CREATE TABLE ExamQuestion (
    examquestion_id VARCHAR(10) PRIMARY KEY,
    exam_id VARCHAR(10),
    question_id VARCHAR(10),
    max_score DECIMAL(5,2) NOT NULL, --Điểm tối đa cho câu hỏi trong bài kiểm tra.
    FOREIGN KEY (exam_id) REFERENCES Exam(exam_id),
    FOREIGN KEY (question_id) REFERENCES Question(question_id)
);

-- Trigger for generating examquestion_id
CREATE OR REPLACE FUNCTION before_insert_exam_question()
RETURNS TRIGGER AS $$
BEGIN
    NEW.examquestion_id := 'EQ' || LPAD(nextval('examquestion_id_seq')::TEXT, 5, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_exam_question_trigger
BEFORE INSERT ON ExamQuestion
FOR EACH ROW
EXECUTE FUNCTION before_insert_exam_question();

-- Creating Essay table
CREATE TABLE Essay (
    essay_id VARCHAR(10) PRIMARY KEY,
    examquestion_id VARCHAR(10), --ID của câu hỏi trong bài kiểm tra.
    student_id VARCHAR(10),
    essay_content TEXT NOT NULL,
    submit_time TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES Users(user_id),
    FOREIGN KEY (examquestion_id) REFERENCES ExamQuestion(examquestion_id)
);

-- Trigger for generating essay_id
CREATE OR REPLACE FUNCTION before_insert_essay()
RETURNS TRIGGER AS $$
BEGIN
    NEW.essay_id := 'ES' || LPAD(nextval('essay_id_seq')::TEXT, 5, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_essay_trigger
BEFORE INSERT ON Essay
FOR EACH ROW
EXECUTE FUNCTION before_insert_essay();

-- Creating ExamResult table
CREATE TABLE ExamResult ( --Kết quả bài kiểm tra của mỗi học sinh (tổng điểm các bài essay đã submit))
    result_id VARCHAR(10) PRIMARY KEY,
    exam_id VARCHAR(10),
    student_id VARCHAR(10),
    total_score DECIMAL(5,2), --Điểm tổng kết cho bài luận.
    FOREIGN KEY (exam_id) REFERENCES Exam(exam_id),
    FOREIGN KEY (student_id) REFERENCES Users(user_id)
);

-- Trigger for generating result_id
CREATE OR REPLACE FUNCTION before_insert_exam_result()
RETURNS TRIGGER AS $$
BEGIN
    NEW.result_id := 'ER' || LPAD(nextval('examresult_id_seq')::TEXT, 5, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_exam_result_trigger
BEFORE INSERT ON ExamResult
FOR EACH ROW
EXECUTE FUNCTION before_insert_exam_result();

-- Creating ExamResultCriteria table
CREATE TABLE ExamResultCriteria ( --Cho từng câu hỏi 
    result_criteria_id VARCHAR(10) PRIMARY KEY,
    essay_id VARCHAR(10),
    detail_id VARCHAR(10),
    score DECIMAL(5,2), -- Điểm cho bài luận theo tiêu chí này.
    FOREIGN KEY (detail_id) REFERENCES CriteriaDetail(detail_id),
    FOREIGN KEY (essay_id) REFERENCES Essay(essay_id)
);

-- Trigger for generating result_criteria_id
CREATE OR REPLACE FUNCTION before_insert_exam_result_criteria()
RETURNS TRIGGER AS $$
BEGIN
    NEW.result_criteria_id := 'ERC' || LPAD(nextval('examresultcriteria_id_seq')::TEXT, 5, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_exam_result_criteria_trigger
BEFORE INSERT ON ExamResultCriteria
FOR EACH ROW
EXECUTE FUNCTION before_insert_exam_result_criteria();

CREATE TABLE Enrollment (
    enrollment_id SERIAL PRIMARY KEY,
    exam_id VARCHAR(10),
    student_id VARCHAR(10),
    has_submitted BOOLEAN DEFAULT FALSE,
    enrolled_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_exam FOREIGN KEY (exam_id) REFERENCES Exam(exam_id),
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES Users(user_id),
    UNIQUE (exam_id, student_id) -- Đảm bảo mỗi học sinh chỉ đăng ký một lần vào mỗi bài kiểm tra
);

CREATE OR REPLACE FUNCTION update_enrollment_after_essay()
RETURNS TRIGGER AS $$
DECLARE
    exam_id_var VARCHAR(10);
BEGIN
    -- Lấy exam_id từ bảng ExamQuestion dựa trên examquestion_id từ bảng Essay
    SELECT eq.exam_id INTO exam_id_var
    FROM ExamQuestion eq
    WHERE eq.examquestion_id = NEW.examquestion_id;

    -- Cập nhật trạng thái has_enrolment trong bảng Enrollment
    UPDATE Enrollment
    SET has_submitted = TRUE
    WHERE student_id = NEW.student_id AND exam_id = exam_id_var;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_insert_essay
AFTER INSERT ON Essay
FOR EACH ROW
EXECUTE FUNCTION update_enrollment_after_essay();


INSERT INTO Users (username, password, role, fullname, birthday, gender) VALUES
('admin@example.com', '$2b$10$y9X/00JNugJAwOD2Gi49FOdYl960UB4ILjPKsgxNBJZXnHnF1evZ2', 'Admin', 'Admin User', '1990-01-01', 'Male'),
('group_leader@example.com', '$2b$10$TVRzCrQl72FUHdeZzQtR6OaFevhST20UjzNST.LISKPG9FtbhOk02', 'Group Leader', 'Group Leader User', '1992-05-15', 'Female'),
('teacher1@example.com', '$2b$10$Yun1Gjstxz3NqEMFGnc4ZulJzGlaiPcygktJs8Lg09yniyOuXLlZK', 'Teacher', 'Teacher User 1', '1988-08-20', 'Male'),
('teacher2@example.com', '$2b$10$Yun1Gjstxz3NqEMFGnc4ZulJzGlaiPcygktJs8Lg09yniyOuXLlZK', 'Teacher', 'Teacher User 2', '1988-08-20', 'Male'),
('student1@example.com', '$2b$10$0hRHGjUbPp8fFISCqtoeBeoHw.qmlEOdHmfVKJKRRh2k026oKdqR2', 'Student', 'Student User 1', '2002-03-10', 'Male'),
('student2@example.com', '$2b$10$0hRHGjUbPp8fFISCqtoeBeoHw.qmlEOdHmfVKJKRRh2k026oKdqR2', 'Student', 'Student User 2', '2001-11-25', 'Female');


INSERT INTO QuestionBank (bank_name, description, created_by) VALUES
('English Grammar', 'Questions related to English grammar', 'U00002'),  
('Literature Analysis', 'Questions related to literature analysis', 'U00002');  

INSERT INTO Question (bank_id, question_content) VALUES
('QB00001', 'Hãy viết lại câu sau ở thì quá khứ đơn: I go to school every day.'),
('QB00001', 'Hãy giải thích sự khác biệt giữa thì hiện tại hoàn thành và thì hiện tại hoàn thành tiếp diễn.'),
('QB00002', 'Phân tích nhân vật Chí Phèo trong tác phẩm "Chí Phèo" của nhà văn Nam Cao.'),
('QB00002', 'Hãy nêu những nét đặc sắc về nghệ thuật trong bài thơ "Đoàn thuyền đánh cá" của Huy Cận.');

INSERT INTO CriteriaDetail (question_id, criteria_id, wordcount, contain_phrase, threshold) VALUES
('Q00001', 'C001', NULL, 'I went to school every day.', NULL),
('Q00002', 'C001', NULL, 'action, past, continues', NULL),
('Q00003', 'C001', NULL, 'bi thảm, tội lỗi', NULL),
('Q00004', 'C003', 100, NULL, NULL);

-- Sample data for Exam table
INSERT INTO Exam (exam_title, description, created_by, start_time, end_time) VALUES
('English Exam 1', 'First English grammar exam', 'U00003', '2024-06-17 09:00:00', '2024-06-17 11:00:00'),
('Literature Exam 1', 'First literature analysis exam', 'U00004', '2024-06-18 13:00:00', '2024-06-18 15:00:00');

INSERT INTO ExamQuestion (exam_id, question_id, max_score) VALUES
('E00001', 'Q00001', 5.0),
('E00001', 'Q00002', 5.0),
('E00002', 'Q00003', 6.0),
('E00002', 'Q00004', 4.0);

INSERT INTO Enrollment (exam_id, student_id) VALUES ('E00001', 'U00005');
INSERT INTO Enrollment (exam_id, student_id) VALUES ('E00002', 'U00006');
INSERT INTO Enrollment (exam_id, student_id) VALUES ('E00001', 'U00006');

INSERT INTO Essay (examquestion_id, student_id, essay_content, submit_time) VALUES
('EQ00001', 'U00005', 'I went to school every day.', NOW()),
('EQ00002', 'U00005', 'The present perfect tense is used to describe an action that started in the past and continues to the present.', NOW()),
('EQ00003', 'U00006', 'Chí Phèo là một nhân vật có số phận bi thảm, bị xã hội đẩy vào con đường tội lỗi.', NOW()),
('EQ00004', 'U00006', 'Bài thơ "Đoàn thuyền đánh cá" của Huy Cận có những nét đặc sắc về nghệ thuật...', NOW()); 
