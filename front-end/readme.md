API Endpoints
nếu là tạo đề mới, ko gửi data trước, nếu tạo đề cũ, gửi data theo format đề mẫu ở server_main.js

1. Fetch Folder Information
-Endpoint: pesudo_api.json
-Method: GET
-Description: Fetches a list of all folders. Each folder includes details such as the folder name, the number of questions it contains, and the subject area.
-Expected Response:
[
    {
      "id":1,
      "name": "Toán học lớp 9",
      "questionCount": 120,
      "subject": "Toán học"
    },
    {
      "id":2,
      "name": "Lý 10 cơ bản",
      "questionCount": 85,
      "subject": "Vật lý"
    }
]
2. Fetch Questions from a Specific Folder
-Endpoint: pesudo_api2.json
-Method: GET
-Description: Retrieves all questions within a specified folder, including detailed information for each question such as title, content, and associated criteria.
-Expected Response:
{
  "name": "Question Bank",
  "questions": [
    {
      "id": "q1", 
      "title": "What is the capital of France?",
      "content": "This is a simple question about geography.  Can you answer it?,This is a simple question about geography.  Can you answer it?,This is a simple question about geography.  Can you answer it?,This is a simple question about geography.  Can you answer it?",
      "criteria": [
        "Easy",
        "Medium",
        "Hard"
      ]
    },
    {
      "id": "q2", 
      "title": "Explain the concept of photosynthesis",
      "content": "This question requires a deeper understanding of biology.",
      "criteria": [
        "Basic understanding",
        "Advanced understanding"
      ]
    },
  ]
}
3. question_list.hbs
cái này thì lưu ở public/modal/question_list.hbs
4. folder_question.hbs
cái này thì lưu ở public/modal/folder_question.hbs
5. Send test data back 
data: payload
uncomment fetch line 386