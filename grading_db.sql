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

-- Creating Users table
CREATE TABLE Users (
    user_id VARCHAR(10) PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
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
    bank_id VARCHAR(10),
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

-- Creating CriteriaDetail table
CREATE TABLE CriteriaDetail (
    detail_id VARCHAR(10) PRIMARY KEY,
    question_id VARCHAR(10),
    criteria_id VARCHAR(4),
    wordcount INT,
    phrase VARCHAR(255),
    threshold INT,
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
    exam_id VARCHAR(10),
    student_id VARCHAR(10),
    essay_content TEXT NOT NULL,
    submit_time TIMESTAMP,
    FOREIGN KEY (exam_id) REFERENCES Exam(exam_id),
    FOREIGN KEY (student_id) REFERENCES Users(user_id)
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
CREATE TABLE ExamResult (
    result_id VARCHAR(10) PRIMARY KEY,
    essay_id VARCHAR(10),
    graded_by VARCHAR(10),
    score DECIMAL(5,2),
    graded_time TIMESTAMP,
    FOREIGN KEY (essay_id) REFERENCES Essay(essay_id),
    FOREIGN KEY (graded_by) REFERENCES Users(user_id)
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
CREATE TABLE ExamResultCriteria (
    result_criteria_id VARCHAR(10) PRIMARY KEY,
    result_id VARCHAR(10),
    criteria_id VARCHAR(4),
    FOREIGN KEY (result_id) REFERENCES ExamResult(result_id),
    FOREIGN KEY (criteria_id) REFERENCES Criteria(criteria_id)
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


---Insert data
INSERT INTO Users (user_id, username, password, role, fullname, birthday, gender) VALUES
('U00001', 'admin', 'password123', 'Admin', 'Nguyen Van A', '2000-01-01', 'Male'),
('U00002', 'group_leader1', 'password456', 'Group Leader', 'Nguyen Thi B', '2000-02-02', 'Female'),
('U00003', 'teacher1', 'password789', 'Teacher', 'Tran Van C', '2000-03-03', 'Male'),
('U00004', 'student1', 'password012', 'Student', 'Học sinh 1', '2000-04-04', 'Female'),
('U00005', 'student2', 'password345', 'Student', 'Học sinh 2', '2000-05-05', 'Male');

INSERT INTO QuestionBank (bank_id, bank_name, description, created_by) VALUES
('QB00001', 'Ngân hàng câu hỏi ngữ pháp tiếng Anh', 'Chứa các câu hỏi về ngữ pháp tiếng Anh cơ bản', 'U00002'),
('QB00002', 'Ngân hàng câu hỏi văn học', 'Chứa các câu hỏi về phân tích tác phẩm văn học', 'U00002');

INSERT INTO Question (question_id, bank_id, question_content) VALUES
('Q00001', 'QB00001', 'Hãy viết lại câu sau ở thì quá khứ đơn: I go to school every day.'),
('Q00002', 'QB00001', 'Hãy giải thích sự khác biệt giữa thì hiện tại hoàn thành và thì hiện tại hoàn thành tiếp diễn.'),
('Q00003', 'QB00002', 'Phân tích nhân vật Chí Phèo trong tác phẩm "Chí Phèo" của nhà văn Nam Cao.'),
('Q00004', 'QB00002', 'Hãy nêu những nét đặc sắc về nghệ thuật trong bài thơ "Đoàn thuyền đánh cá" của Huy Cận.');

INSERT INTO CriteriaDetail (detail_id, question_id, criteria_id, wordcount, phrase, threshold) VALUES
('CD00001', 'Q00001', 'C001', NULL, 'went', NULL),
('CD00002', 'Q00002', 'C003', 100, NULL, NULL),
('CD00003', 'Q00003', 'C001', NULL, 'Chí Phèo', NULL),
('CD00004', 'Q00004', 'C001', NULL, 'huy cận', NULL),
('CD00005', 'Q00004', 'C002', NULL, 'biển', 2);


INSERT INTO Exam (exam_id, exam_title, description, created_by) VALUES
('E00001', 'Đề thi tiếng Anh', 'Đề thi kiểm tra kiến thức ngữ pháp tiếng Anh', 'U00003'),
('E00002', 'Đề thi văn học', 'Đề thi phân tích tác phẩm văn học', 'U00003');

INSERT INTO ExamQuestion (examquestion_id, exam_id, question_id) VALUES
('EQ00001', 'E00001', 'Q00001'),
('EQ00002', 'E00001', 'Q00002'),
('EQ00003', 'E00002', 'Q00003'),
('EQ00004', 'E00002', 'Q00004');

INSERT INTO Essay (essay_id, exam_id, student_id, essay_content, submit_time) VALUES
('ES00001', 'E00001', 'U00004', 'I went to school every day.', '2023-10-26 10:00:00'),
('ES00002', 'E00001', 'U00005', 'The present perfect tense is used to describe an action that started in the past and continues to the present.', '2023-10-26 10:15:00'),
('ES00003', 'E00002', 'U00004', 'Chí Phèo là một nhân vật có số phận bi thảm, bị xã hội đẩy vào con đường tội lỗi.', '2023-10-26 10:30:00');

INSERT INTO ExamResult (result_id, essay_id, graded_by, score, graded_time) VALUES
('ER00001', 'ES00001', 'U00003', 8.0, '2023-10-27 10:00:00'),
('ER00002', 'ES00002', 'U00003', 9.0, '2023-10-27 10:15:00'),
('ER00003', 'ES00003', 'U00003', 7.5, '2023-10-27 10:30:00');

INSERT INTO ExamResultCriteria (result_criteria_id, result_id, criteria_id) VALUES
('ERC00001', 'ER00001', 'C001'),
('ERC00002', 'ER00002', 'C003'),
('ERC00003', 'ER00003', 'C001');