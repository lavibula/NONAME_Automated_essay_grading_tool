-- Drop tables if they exist
DROP TABLE IF EXISTS "Criteria";
DROP TABLE IF EXISTS "ExamResults";
DROP TABLE IF EXISTS "Essay";
DROP TABLE IF EXISTS "ExamQuestion";
DROP TABLE IF EXISTS "Exam";
DROP TABLE IF EXISTS "Question";
DROP TABLE IF EXISTS "QuestionBank";
DROP TABLE IF EXISTS "User";

CREATE TABLE public."Criteria" (
    criteria_id SERIAL PRIMARY KEY,
    criteria_name VARCHAR(255) NOT NULL
);
CREATE TABLE public."User" (
    user_id VARCHAR(10) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role INTEGER NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(10) NOT NULL
);
CREATE TABLE public."QuestionBank" (
    bank_id VARCHAR(10) PRIMARY KEY,
    created_by VARCHAR(10) REFERENCES public."User"(user_id),
    bank_name VARCHAR(255) NOT NULL,
    bank_description TEXT
);
CREATE TABLE public."Question" (
    question_id VARCHAR(10) PRIMARY KEY,
    question_bank VARCHAR(10) REFERENCES public."QuestionBank"(bank_id),
    content TEXT NOT NULL
);
CREATE TABLE public."Exam" (
    exam_id VARCHAR(10) PRIMARY KEY,
    created_by VARCHAR(10) REFERENCES public."User"(user_id),
    exam_title VARCHAR(255) NOT NULL,
    exam_password VARCHAR(255) NOT NULL,
    duration INTEGER NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL
);
CREATE TABLE public."Essay" (
    essay_id VARCHAR(11) PRIMARY KEY,
    question_id VARCHAR(10) REFERENCES public."Question"(question_id),
    exam_id VARCHAR(10) REFERENCES public."Exam"(exam_id),
    student_id VARCHAR(10) REFERENCES public."User"(user_id),
    essay_content TEXT NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE NOT NULL
);
CREATE TABLE public."ExamResults" (
    result_id VARCHAR(11) PRIMARY KEY,
    essay_id VARCHAR(11) REFERENCES public."Essay"(essay_id),
    criteria_id INTEGER REFERENCES public."Criteria"(criteria_id),
    score NUMERIC NOT NULL
);
CREATE TABLE public."ExamQuestion" (
    exam_id VARCHAR(10) REFERENCES public."Exam"(exam_id),
    question_id VARCHAR(10) REFERENCES public."Question"(question_id),
    question_order INTEGER NOT NULL,
    question_score NUMERIC NOT NULL,
    PRIMARY KEY (exam_id, question_id)
);
