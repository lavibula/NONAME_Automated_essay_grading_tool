# Models
- Chứa các lớp đại diện cho các đối tượng trong cơ sở dữ liệu (ví dụ: User, Question, Exam, v.v.). 
- Mỗi lớp model có các thuộc tính (properties) và phương thức (methods) để tương tác với dữ liệu trong cơ sở dữ liệu.

## models/User.js:
Tạo class User để đại diện cho đối tượng user trong database. Với các method như sau:
- create: Thực hiện INSERT vào bảng "User" và trả về đối tượng User mới.
- getById: Thực hiện SELECT để lấy thông tin user dựa trên ID và trả về đối tượng User.
- getByUsername: Thực hiện SELECT để lấy thông tin user dựa trên username và trả về đối tượng User.
- update: Thực hiện UPDATE để cập nhật thông tin user và trả về đối tượng User được cập nhật.
- delete: Thực hiện DELETE để xóa user khỏi database.
- hashPassword: Hàm tĩnh để mã hóa mật khẩu trước khi lưu vào database.