# Services
- Chứa các lớp cung cấp các logic nghiệp vụ của hệ thống, bao gồm việc xử lý các thao tác liên quan đến dữ liệu và logic nghiệp vụ. 
- Mỗi lớp service tương ứng với một loại resource (ví dụ: UserService cho resource User).

## services/userService.js:
- Sử dụng các hàm static của class User để tương tác với database.
- Thêm hàm hashPassword để mã hóa mật khẩu trước khi lưu vào database.
- Thực hiện logic xác thực đăng nhập và đổi mật khẩu.