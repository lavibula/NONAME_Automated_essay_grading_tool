# NONAME_Automated_essay_grading_tool

- High Cohesion: Mỗi lớp chỉ tập trung vào một chức năng cụ thể (ví dụ: GroupLeader chỉ xử lý ngân hàng câu hỏi).
- Low Coupling: Các lớp được kết nối với nhau thông qua các giao diện (ví dụ: Teacher sử dụng ExamService để tạo đề thi).

## Logic chấm điểm tự động:
- Chấm điểm bài luận:
+ Giáo viên chấm điểm bài luận theo các tiêu chí được đặt trước trong đề thi.
- Mỗi tiêu chí có thể là:
+ Kiểm tra sự xuất hiện của từ khóa.
+ Kiểm tra số lượng từ khóa xuất hiện.
+ Kiểm tra độ dài bài luận.
- Hệ thống tự động tính điểm dựa trên các tiêu chí tương ứng.
