--Insert Sample Data:
INSERT INTO "Criteria" (criteria_name) VALUES 
    ('Content'),
    ('Grammar'),
    ('Structure');
--User Table:
INSERT INTO "User" (user_id, email, password, first_name, last_name, role, dob, gender) VALUES 
    ('U20230001', 'admin@example.com', '$2b$10$O2X8yYxR1d87nE.L.s1X.uJq1017b6bM36/N4r71T7z92L9y56i', 'Admin', 'User', 0, '2000-01-01', 'Male'), -- Admin
    ('U20230002', 'group_leader@example.com', '$2b$10$O2X8yYxR1d87nE.L.s1X.uJq1017b6bM36/N4r71T7z92L9y56i', 'Group', 'Leader', 1, '1999-02-15', 'Female'), -- Group Leader
    ('U20230003', 'teacher@example.com', '$2b$10$O2X8yYxR1d87nE.L.s1X.uJq1017b6bM36/N4r71T7z92L9y56i', 'Teacher', 'User', 2, '1998-03-28', 'Male'), -- Teacher
    ('U20230004', 'student1@example.com', '$2b$10$O2X8yYxR1d87nE.L.s1X.uJq1017b6bM36/N4r71T7z92L9y56i', 'Student', 'One', 3, '2002-04-12', 'Male'), -- Student
    ('U20230005', 'student2@example.com', '$2b$10$O2X8yYxR1d87nE.L.s1X.uJq1017b6bM36/N4r71T7z92L9y56i', 'Student', 'Two', 3, '2001-05-20', 'Female'); -- Student
--QuestionBank Table:
INSERT INTO "QuestionBank" (bank_id, created_by, bank_name, bank_description) VALUES 
    ('QB20230001', 'U20230002', 'Math', 'Essays on various mathematical topics'); 
--Question Table:
INSERT INTO "Question" (question_id, question_bank, content) VALUES 
    ('Q20230001', 'QB20230001', 'What is the solution to the equation: 2x + 3 = 11?'), 
    ('Q20230002', 'QB20230001', 'Simplify the expression: (3x^2 + 4x - 6) / (x - 1).'), 
    ('Q20230003', 'QB20230001', 'Find the value of x if 3^x = 81.'), 
    ('Q20230004', 'QB20230001', 'Solve the quadratic equation: x^2 - 4x + 3 = 0.');

--Exam Table:
INSERT INTO "Exam" (exam_id, created_by, exam_title, exam_password, duration, start_time, end_time) VALUES 
    ('E20230001', 'U20230003', 'Math Essay Exam', 'MathExam123', 60, '2024-03-15 10:00:00', '2024-03-15 11:00:00'),
    ('E20230002', 'U20230003', 'Math History Exam', 'MathExam123', 90, '2024-03-22 14:00:00', '2024-03-22 16:00:00');
--ExamQuestion Table:
INSERT INTO "ExamQuestion" (exam_id, question_id, question_order, question_score) VALUES
    ('E20230001', 'Q20230001', 1, 25),
    ('E20230001', 'Q20230002', 2, 25),
    ('E20230002', 'Q20230003', 1, 30),
    ('E20230002', 'Q20230004', 2, 30);
--Essay Table:
INSERT INTO "Essay" (essay_id, question_id, exam_id, student_id, essay_content, submitted_at) VALUES
    ('ES20230001', 'Q20230001', 'E20230001', 'U20230004', 'The solution to the equation 2x + 3 = 11 is x = 4.', '2024-03-15 10:30:00'),
    ('ES20230002', 'Q20230002', 'E20230001', 'U20230005', 'To simplify the expression (3x^2 + 4x - 6) / (x - 1), we can use long division or factoring...', '2024-03-15 10:45:00'),
    ('ES20230003', 'Q20230003', 'E20230002', 'U20230004', 'Since 81 is 3 to the power of 4, x = 4.', '2024-03-22 14:45:00'),
    ('ES20230004', 'Q20230004', 'E20230002', 'U20230005', 'The quadratic equation x^2 - 4x + 3 = 0 can be solved by factoring or using the quadratic formula...', '2024-03-22 15:15:00');

--ExamResults Table:
INSERT INTO "ExamResults" (result_id, essay_id, criteria_id, score) VALUES
    ('RE20230001', 'ES20230001', 1, 8), 
    ('RE20230002', 'ES20230001', 2, 9), 
    ('RE20230003', 'ES20230002', 1, 7), 
    ('RE20230004', 'ES20230002', 2, 8), 
    ('RE20230005', 'ES20230003', 1, 9), 
    ('RE20230006', 'ES20230003', 2, 10), 
    ('RE20230007', 'ES20230004', 1, 8), 
    ('RE20230008', 'ES20230004', 2, 9);