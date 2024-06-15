INSERT INTO Users (username, password, role, fullname, birthday, gender) VALUES
('student3@example.com', 'password1', 'Student', 'Student User 3', '2001-06-15', 'Female'),
('student4@example.com', 'password2', 'Student', 'Student User 4', '2003-09-18', 'Male'),
('student5@example.com', 'password3', 'Student', 'Student User 5', '2002-12-25', 'Female'),
('student6@example.com', 'password4', 'Student', 'Student User 6', '2001-04-22', 'Male'),
('student7@example.com', 'password5', 'Student', 'Student User 7', '2002-07-13', 'Female'),
('student8@example.com', 'password6', 'Student', 'Student User 8', '2003-10-05', 'Male'),
('student9@example.com', 'password7', 'Student', 'Student User 9', '2001-03-17', 'Female'),
('student10@example.com', 'password8', 'Student', 'Student User 10', '2002-11-08', 'Male'),
('student11@example.com', 'password9', 'Student', 'Student User 11', '2003-05-19', 'Female'),
('student12@example.com', 'password10', 'Student', 'Student User 12', '2001-08-30', 'Male'),
('student13@example.com', 'password11', 'Student', 'Student User 13', '2002-02-14', 'Female'),
('student14@example.com', 'password12', 'Student', 'Student User 14', '2003-12-01', 'Male'),
('student15@example.com', 'password13', 'Student', 'Student User 15', '2001-07-24', 'Female'),
('student16@example.com', 'password14', 'Student', 'Student User 16', '2002-09-11', 'Male'),
('student17@example.com', 'password15', 'Student', 'Student User 17', '2003-11-27', 'Female'),
('student18@example.com', 'password16', 'Student', 'Student User 18', '2001-10-15', 'Male'),
('student19@example.com', 'password17', 'Student', 'Student User 19', '2002-04-09', 'Female'),
('student20@example.com', 'password18', 'Student', 'Student User 20', '2003-06-20', 'Male');

-- INSERT INTO QuestionBank (bank_name, description, created_by) VALUES
-- ('English Grammar', 'Questions related to English grammar', 'U00002'),  
-- ('Literature Analysis', 'Questions related to literature analysis', 'U00002');  

INSERT INTO QuestionBank (bank_name, description, created_by) VALUES
('Modern Poetry', 'Questions related to modern poetry', 'U00003'),  
('Classical Literature', 'Questions related to classical literature', 'U00004'),
('Contemporary Literature', 'Questions related to contemporary literature', 'U00003'),  
('Ancient Poetry', 'Questions related to ancient poetry', 'U00004');

-- INSERT INTO Question (bank_id, question_content) VALUES
-- ('QB00001', 'Hãy viết lại câu sau ở thì quá khứ đơn: I go to school every day.'),
-- ('QB00001', 'Hãy giải thích sự khác biệt giữa thì hiện tại hoàn thành và thì hiện tại hoàn thành tiếp diễn.'),
-- ('QB00002', 'Phân tích nhân vật Chí Phèo trong tác phẩm "Chí Phèo" của nhà văn Nam Cao.'),
-- ('QB00002', 'Hãy nêu những nét đặc sắc về nghệ thuật trong bài thơ "Đoàn thuyền đánh cá" của Huy Cận.');

INSERT INTO Question (bank_id, question_content) VALUES
('QB00003', 'Phân tích bài thơ "Tràng giang" của Huy Cận.'),
('QB00003', 'Giải thích ý nghĩa của hình ảnh "người chiến sĩ" trong bài thơ "Bài thơ về tiểu đội xe không kính" của Phạm Tiến Duật.'),
('QB00004', 'Phân tích nhân vật Tràng trong truyện ngắn "Vợ nhặt" của Kim Lân.'),
('QB00004', 'Nêu cảm nhận của bạn về tác phẩm "Chí Phèo" của Nam Cao.'),
('QB00005', 'Phân tích tác phẩm "Đất Nước" của Nguyễn Khoa Điềm.'),
('QB00005', 'Giải thích ý nghĩa của hình ảnh "đất nước" trong thơ Tố Hữu.'),
('QB00006', 'Phân tích nhân vật Ngô Tử Văn trong truyện "Chuyện chức phán sự đền Tản Viên".'),
('QB00006', 'Nêu cảm nhận của bạn về tác phẩm "Lục Vân Tiên" của Nguyễn Đình Chiểu.');
('QB00007', 'Phân tích bài thơ "Bên kia sông Đuống" của Hoàng Cầm.'),
('QB00007', 'Giải thích ý nghĩa của hình ảnh "chiến sĩ" trong bài thơ "Tây Tiến" của Quang Dũng.'),
('QB00008', 'Phân tích nhân vật Bá Kiến trong truyện ngắn "Chí Phèo" của Nam Cao.'),
('QB00008', 'Nêu cảm nhận của bạn về tác phẩm "Tắt đèn" của Ngô Tất Tố.');


-- INSERT INTO CriteriaDetail (question_id, criteria_id, wordcount, contain_phrase, threshold) VALUES
-- ('Q00001', 'C001', NULL, 'I went to school every day.', NULL),
-- ('Q00002', 'C001', NULL, 'action, past, continues', NULL),
-- ('Q00003', 'C001', NULL, 'bi thảm, tội lỗi', NULL),
-- ('Q00004', 'C003', 100, NULL, NULL);

-- C001: Tiêu chí 'contains phrase' (chứa cụm từ).
-- C003: Tiêu chí 'longer than' (dài hơn một số lượng từ nhất định).
-- threshold: Giá trị tối thiểu của số từ trong câu hỏi.
-- weight: Giá trị mặc định của khối tiêu chí.

INSERT INTO CriteriaDetail (question_id, criteria_id, wordcount, contain_phrase, threshold, weight) VALUES
('Q00005', 'C001', NULL, 'Tràng giang, Huy Cận, sông nước, thơ ca, thiên nhiên, tác phẩm, trữ tình, cảm xúc, hình ảnh, dòng sông, cảnh vật, tâm trạng, cuộc sống, con người, miền quê, thơ mộng, buồn bã, nhớ nhung, yên bình, lãng mạn, hồi tưởng, kỷ niệm, bài thơ, nhà thơ, Việt Nam, thơ hiện đại, tình yêu quê hương, cảnh sắc, hồn thơ, lời thơ', NULL, 0.3),
('Q00005', 'C003', 300, NULL, NULL, 0.7),
('Q00006', 'C001', NULL, 'người chiến sĩ, Phạm Tiến Duật, chiến tranh, anh hùng, Việt Nam, lòng dũng cảm, tình yêu nước, bảo vệ tổ quốc, hy sinh, chiến đấu, lý tưởng, sắt đá, bền bỉ, kiên cường, vượt khó, đồng đội, trận mạc, khói lửa, cuộc chiến, lửa đạn, vinh quang, nghĩa vụ, phẩm chất, lý tưởng sống, tuổi trẻ, đất nước, chiến sĩ, đoàn kết, tinh thần, yêu thương', NULL, 0.4),
('Q00006', 'C003', 300, NULL, NULL, 0.6),
('Q00007', 'C001', NULL, 'Tràng, Vợ nhặt, Kim Lân, nhân vật, cuộc sống, đói nghèo, tình yêu, hạnh phúc, gia đình, tương lai, hy vọng, đồng cảm, con người, phẩm chất, niềm tin, sự sống, khốn khó, nghị lực, tác phẩm, truyện ngắn, xã hội, Việt Nam, nhà văn, tình cảm, cảnh ngộ, chịu đựng, chấp nhận, số phận, văn học, tình huống, nhân sinh, trải nghiệm', NULL, 0.2),
('Q00007', 'C003', 300, NULL, NULL, 0.8),
('Q00008', 'C001', NULL, 'Chí Phèo, Nam Cao, nhân vật, số phận, bi kịch, xã hội, nông thôn, Việt Nam, thời phong kiến, nghèo khổ, tội lỗi, bần cùng, cải tạo, nhân cách, lòng nhân ái, sự thay đổi, đau khổ, căm phẫn, cuộc đời, sự thật, tác phẩm, tiểu thuyết, nhà văn, tâm lý, hiện thực, văn học, phong tục, niềm tin, tội phạm, hối hận, cảm xúc', NULL, 0.3),
('Q00008', 'C003', 300, NULL, NULL, 0.7),
('Q00009', 'C001', NULL, 'Đất Nước, Nguyễn Khoa Điềm, lịch sử, văn hóa, dân tộc, truyền thống, yêu nước, tự hào, quê hương, cuộc sống, chiến tranh, hòa bình, phát triển, hiện đại, tương lai, con người, xã hội, cuộc đấu tranh, tự do, nhân dân, độc lập, văn học, thơ ca, tác phẩm, nhà thơ, bài thơ, Việt Nam, thiên nhiên, cảm xúc, hình ảnh, tâm trạng', NULL, 0.4),
('Q00009', 'C003', 300, NULL, NULL, 0.6),
('Q00010', 'C001', NULL, 'đất nước, Tố Hữu, tình yêu nước, chiến đấu, bảo vệ tổ quốc, anh hùng, hy sinh, lòng dũng cảm, tương lai, tự do, độc lập, hòa bình, lịch sử, dân tộc, truyền thống, văn hóa, xã hội, nhân dân, con người, tình cảm, cảm xúc, thơ ca, văn học, tác phẩm, bài thơ, hiện thực, lý tưởng, cuộc sống, ý nghĩa, hình ảnh', NULL, 0.2),
('Q00010', 'C003', 300, NULL, NULL, 0.8),
('Q00011', 'C001', NULL, 'Ngô Tử Văn, Chuyện chức phán sự đền Tản Viên, nhân vật, tính cách, dũng cảm, thông minh, chính trực, chiến đấu, bảo vệ công lý, văn học, truyện cổ tích, Việt Nam, tác phẩm, nhà văn, câu chuyện, nghĩa vụ, lòng tin, phẩm chất, xã hội, cuộc sống, thiên nhiên, tâm linh, lịch sử, dân tộc, truyền thống, phong tục, tập quán, cảm xúc, niềm tin, hình ảnh', NULL, 0.3),
('Q00011', 'C003', 300, NULL, NULL, 0.7),
('Q00012', 'C001', NULL, 'Lục Vân Tiên, Nguyễn Đình Chiểu, nhân vật, tính cách, dũng cảm, hiếu học, trung thực, lòng nhân ái, chiến đấu, bảo vệ công lý, văn học, tác phẩm, nhà văn, thơ ca, Việt Nam, câu chuyện, lịch sử, văn hóa, truyền thống, dân tộc, xã hội, cuộc sống, phẩm chất, nghĩa vụ, tình cảm, lòng tin, cảm xúc, ý nghĩa, bài thơ, nhân văn', NULL, 0.4),
('Q00012', 'C003', 300, NULL, NULL, 0.6);
('Q00013', 'C001', NULL, 'Bên kia sông Đuống, Hoàng Cầm, chiến tranh, đất nước, quê hương, tác phẩm, thơ ca, trữ tình, cảm xúc, hình ảnh, cuộc sống, con người, chiến sĩ, Việt Nam, thơ hiện đại, tình yêu quê hương, cảnh sắc, hồn thơ, lời thơ', NULL, 0.3),
('Q00013', 'C003', 300, NULL, NULL, 0.7),
('Q00014', 'C001', NULL, 'chiến sĩ, Quang Dũng, chiến tranh, anh hùng, Việt Nam, lòng dũng cảm, tình yêu nước, bảo vệ tổ quốc, hy sinh, chiến đấu, lý tưởng, sắt đá, bền bỉ, kiên cường, vượt khó, đồng đội, trận mạc, khói lửa, cuộc chiến, lửa đạn, vinh quang, nghĩa vụ, phẩm chất, lý tưởng sống, tuổi trẻ, đất nước, chiến sĩ, đoàn kết, tinh thần, yêu thương', NULL, 0.4),
('Q00014', 'C003', 300, NULL, NULL, 0.6),
('Q00015', 'C001', NULL, 'Bá Kiến, Chí Phèo, Nam Cao, nhân vật, tính cách, gian trá, độc ác, xã hội, phong kiến, nghèo khổ, quyền lực, tác phẩm, tiểu thuyết, nhà văn, cuộc sống, phẩm chất, xã hội, văn học, phong tục, niềm tin, tâm lý, hiện thực, cảm xúc', NULL, 0.2),
('Q00015', 'C003', 300, NULL, NULL, 0.8),
('Q00016', 'C001', NULL, 'Tắt đèn, Ngô Tất Tố, nhân vật, tính cách, dũng cảm, hy sinh, nghèo khổ, xã hội, phong kiến, cuộc sống, người nông dân, tác phẩm, tiểu thuyết, nhà văn, hiện thực, văn học, phong tục, niềm tin, tâm lý, cảm xúc, đấu tranh', NULL, 0.3),
('Q00016', 'C003', 300, NULL, NULL, 0.7);

INSERT INTO Exam (exam_title, description, created_by) VALUES
('Modern Poetry Exam', 'Exam on modern poetry', 'U00003'),
('Classical Literature Exam', 'Exam on classical literature', 'U00004'),
('Contemporary Literature Exam', 'Exam on contemporary literature', 'U00003'),
('Ancient Poetry Exam', 'Exam on ancient poetry', 'U00004'),
('Modern Poetry Exam 2', 'Second exam on modern poetry', 'U00003'),
('Classical Literature Exam 2', 'Second exam on classical literature', 'U00004'),
('Contemporary Literature Exam 2', 'Second exam on contemporary literature', 'U00003'),
('Ancient Poetry Exam 2', 'Second exam on ancient poetry', 'U00004');

INSERT INTO ExamQuestion (exam_id, question_id, max_score) VALUES
('E00003', 'Q00005', 4.0),
('E00003', 'Q00006', 6.0),
('E00004', 'Q00007', 5.0),
('E00004', 'Q00008', 5.0),
('E00005', 'Q00009', 6.0),
('E00005', 'Q00010', 4.0),
('E00006', 'Q00011', 4.0),
('E00006', 'Q00012', 6.0),
('E00007', 'Q00013', 4.0),
('E00007', 'Q00014', 6.0),
('E00008', 'Q00015', 5.0),
('E00008', 'Q00016', 5.0);



INSERT INTO Essay (examquestion_id, student_id, essay_content, submit_time) VALUES
('EQ00003', 'U00007', 'Bài thơ "Tràng giang" của Huy Cận là một tác phẩm mang đầy chất trữ tình...', NOW()),
('EQ00003', 'U00008', 'Trong bài thơ "Bài thơ về tiểu đội xe không kính", hình ảnh người chiến sĩ được khắc họa với...', NOW()),
('EQ00004', 'U00009', 'Nhân vật Tràng trong "Vợ nhặt" của Kim Lân là một hình tượng tiêu biểu...', NOW()),
('EQ00004', 'U00010', 'Tác phẩm "Chí Phèo" của Nam Cao đã phản ánh rõ nét...', NOW()),
('EQ00005', 'U00011', 'Tác phẩm "Đất Nước" của Nguyễn Khoa Điềm là một bản hùng ca về lịch sử và văn hóa dân tộc...', NOW()),
('EQ00005', 'U00012', 'Hình ảnh "đất nước" trong thơ Tố Hữu được thể hiện với lòng yêu nước sâu sắc...', NOW()),
('EQ00006', 'U00013', 'Nhân vật Ngô Tử Văn trong "Chuyện chức phán sự đền Tản Viên" là một người chính trực và dũng cảm...', NOW()),
('EQ00006', 'U00014', 'Tác phẩm "Lục Vân Tiên" của Nguyễn Đình Chiểu mang đậm tính nhân văn và giá trị văn học...', NOW()),
('EQ00007', 'U00015', 'Bài thơ "Bên kia sông Đuống" của Hoàng Cầm là một tác phẩm đầy cảm xúc...', NOW()),
('EQ00007', 'U00016', 'Hình ảnh chiến sĩ trong "Tây Tiến" của Quang Dũng thể hiện sự dũng cảm...', NOW()),
('EQ00008', 'U00017', 'Nhân vật Bá Kiến trong "Chí Phèo" của Nam Cao là một hình tượng độc đáo...', NOW()),
('EQ00008', 'U00018', 'Tác phẩm "Tắt đèn" của Ngô Tất Tố mang đậm tính hiện thực...', NOW());
