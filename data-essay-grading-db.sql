-- Drop tables if they exist
DROP TABLE IF EXISTS "Criteria";
DROP TABLE IF EXISTS "ExamResults";
DROP TABLE IF EXISTS "Essay";
DROP TABLE IF EXISTS "ExamQuestion";
DROP TABLE IF EXISTS "Exam";
DROP TABLE IF EXISTS "Question";
DROP TABLE IF EXISTS "QuestionBank";
DROP TABLE IF EXISTS "User";

-- Create Criteria Table
CREATE TABLE public."Criteria" (
    criteria_id VARCHAR(10) PRIMARY KEY,
    criteria_name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL, -- Loại tiêu chí (wordCount, containsPhrase, etc.)
    phrase VARCHAR(255), -- Cụm từ cần kiểm tra (nếu áp dụng)
    threshold INT, -- Ngưỡng số lần xuất hiện tối thiểu (nếu áp dụng)
    wordCount INT, -- Số lượng từ tối thiểu (nếu áp dụng)
    maxScore INT NOT NULL -- Điểm số tối đa cho tiêu chí
);

-- Create User Table
CREATE TABLE public."User" (
    user_id VARCHAR(10) PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(255) NOT NULL, -- Vai trò của người dùng
    fullName VARCHAR(255),
    birthday DATE,
    gender VARCHAR(255)
);

-- Create QuestionBank Table
CREATE TABLE public."QuestionBank" (
    bank_id VARCHAR(10) PRIMARY KEY,
    user_id VARCHAR(10) REFERENCES public."User"(user_id),
    bank_name VARCHAR(255) NOT NULL,
    bank_description TEXT
);

-- Create Question Table
CREATE TABLE public."Question" (
    question_id VARCHAR(10) PRIMARY KEY,
    question_bank VARCHAR(10) REFERENCES public."QuestionBank"(bank_id),
    content TEXT NOT NULL,
    criteria JSONB  -- Các tiêu chí chấm điểm (dạng JSON)
);

-- Create Exam Table
CREATE TABLE public."Exam" (
    exam_id VARCHAR(10) PRIMARY KEY,
    user_id VARCHAR(10) REFERENCES public."User"(user_id),
    exam_title VARCHAR(255) NOT NULL,
    exam_password VARCHAR(255) NOT NULL,
    duration INTEGER NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE -- Trạng thái hoạt động của đề thi
);

-- Create Essay Table
CREATE TABLE public."Essay" (
    essay_id VARCHAR(11) PRIMARY KEY,
    question_id VARCHAR(10) REFERENCES public."Question"(question_id),
    exam_id VARCHAR(10) REFERENCES public."Exam"(exam_id),
    user_id VARCHAR(10) REFERENCES public."User"(user_id),
    essay_content TEXT NOT NULL,
    submitted_date TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create ExamResults Table
CREATE TABLE public."ExamResults" (
    result_id VARCHAR(11) PRIMARY KEY,
    essay_id VARCHAR(11) REFERENCES public."Essay"(essay_id),
    criteria_id VARCHAR(10) REFERENCES public."Criteria"(criteria_id),
    score NUMERIC NOT NULL
);

-- Create ExamQuestion Table
CREATE TABLE public."ExamQuestion" (
    exam_id VARCHAR(10) REFERENCES public."Exam"(exam_id),
    question_id VARCHAR(10) REFERENCES public."Question"(question_id),
    order_number INTEGER NOT NULL,
    score NUMERIC NOT NULL,
    PRIMARY KEY (exam_id, question_id)
);

-- Insert Sample Data
-- Criteria Table
INSERT INTO public."Criteria" (criteria_id, criteria_name, type, phrase, threshold, wordCount, maxScore) VALUES 
    ('C001', 'Word Count', 'wordCount', NULL, NULL, 50, 10),
    ('C002', 'Contains Phrase Algebra', 'containsPhrase', 'algebra', NULL, NULL, 5),
    ('C003', 'Contains Phrase Calculus', 'containsPhrase', 'calculus', NULL, NULL, 5);

-- User Table
INSERT INTO public."User" (user_id, username, password, email, role, fullName, birthday, gender) VALUES 
    ('U20230001', 'admin', '$2b$10$O2X8yYxR1d87nE.L.s1X.uJq1017b6bM36/N4r71T7z92L9y56i', 'admin@example.com', 'Admin', 'Admin User', '2000-01-01', 'Male'),
    ('U20230002', 'group_leader', '$2b$10$O2X8yYxR1d87nE.L.s1X.uJq1017b6bM36/N4r71T7z92L9y56i', 'group_leader@example.com', 'Group Leader', 'Group Leader', '1999-02-15', 'Female'),
    ('U20230003', 'teacher', '$2b$10$O2X8yYxR1d87nE.L.s1X.uJq1017b6bM36/N4r71T7z92L9y56i', 'teacher@example.com', 'Teacher', 'Teacher User', '1998-03-28', 'Male'),
    ('U20230004', 'student1', '$2b$10$O2X8yYxR1d87nE.L.s1X.uJq1017b6bM36/N4r71T7z92L9y56i', 'student1@example.com', 'Student', 'Student One', '2002-04-12', 'Male'),
    ('U20230005', 'student2', '$2b$10$O2X8yYxR1d87nE.L.s1X.uJq1017b6bM36/N4r71T7z92L9y56i', 'student2@example.com', 'Student', 'Student Two', '2001-05-20', 'Female');

-- QuestionBank Table
INSERT INTO public."QuestionBank" (bank_id, user_id, bank_name, bank_description) VALUES 
    ('QB20230001', 'U20230002', 'Math', 'Essays on various mathematical topics'); 

-- Question Table
INSERT INTO public."Question" (question_id, question_bank, content, criteria) VALUES 
    ('Q20230001', 'QB20230001', 'What is the solution to the equation: 2x + 3 = 11?', '[{"type": "containsPhrase", "phrase": "x = 4", "maxScore": 5}]'), 
    ('Q20230002', 'QB20230001', 'Simplify the expression: (3x^2 + 4x - 6) / (x - 1).', '[{"type": "wordCount", "wordCount": 50, "maxScore": 10}, {"type": "containsPhrase", "phrase": "long division", "maxScore": 5}, {"type": "containsPhrase", "phrase": "factoring", "maxScore": 5}]'), 
    ('Q20230003', 'QB20230001', 'Find the value of x if 3^x = 81.', '[{"type": "containsPhrase", "phrase": "x = 4", "maxScore": 5}]'), 
    ('Q20230004', 'QB20230001', 'Solve the quadratic equation: x^2 - 4x + 3 = 0.', '[{"type": "containsPhrase", "phrase": "factoring", "maxScore": 5}, {"type": "containsPhrase", "phrase": "quadratic formula", "maxScore": 5}]');

-- Exam Table
INSERT INTO public."Exam" (exam_id, user_id, exam_title, exam_password, duration, start_time, end_time, is_active) VALUES 
    ('E20230001', 'U20230003', 'Math Essay Exam', 'MathExam123', 60, '2024-03-15 10:00:00+00', '2024-03-15 11:00:00+00', TRUE),
    ('E20230002', 'U20230003', 'Math History Exam', 'MathExam123', 90, '2024-03-22 14:00:00+00', '2024-03-22 15:30:00+00', FALSE);

-- ExamQuestion Table
INSERT INTO public."ExamQuestion" (exam_id, question_id, order_number, score) VALUES
    ('E20230001', 'Q20230001', 1, 25),
    ('E20230001', 'Q20230002', 2, 25),
    ('E20230002', 'Q20230003', 1, 30),
    ('E20230002', 'Q20230004', 2, 30);

-- Essay Table
INSERT INTO public."Essay" (essay_id, question_id, exam_id, user_id, essay_content, submitted_date) VALUES
    ('ES20230001', 'Q20230001', 'E20230001', 'U20230004', 'The solution to the equation 2x + 3 = 11 is x = 4.', '2024-03-15 10:30:00+00'),
    ('ES20230002', 'Q20230002', 'E20230001', 'U20230005', 'To simplify the expression (3x^2 + 4x - 6) / (x - 1), we can use long division or factoring...', '2024-03-15 10:45:00+00'),
    ('ES20230003', 'Q20230003', 'E20230002', 'U20230004', 'Since 81 is 3 to the power of 4, x = 4.', '2024-03-22 14:45:00+00'),
    ('ES20230004', 'Q20230004', 'E20230002', 'U20230005', 'The quadratic equation x^2 - 4x + 3 = 0 can be solved by factoring or using the quadratic formula...', '2024-03-22 15:15:00+00');

-- ExamResults Table
INSERT INTO public."ExamResults" (result_id, essay_id, criteria_id, score) VALUES
    ('RE20230001', 'ES20230001', 'C001', 8), 
    ('RE20230002', 'ES20230001', 'C002', 9), 
    ('RE20230003', 'ES20230002', 'C001', 7), 
    ('RE20230004', 'ES20230002', 'C002', 8), 
    ('RE20230005', 'ES20230003', 'C001', 9), 
    ('RE20230006', 'ES20230003', 'C002', 10), 
    ('RE20230007', 'ES20230004', 'C001', 8), 
    ('RE20230008', 'ES20230004', 'C002', 9);
