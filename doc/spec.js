var spec = {
    swagger: "2.0",
    info: {
        description: "Thích chấm điểm tự động ahiihi",
        version: "1.0",
        title: "Automated Grading Essay API"
    },
    host: "localhost:3000",
    basePath: "/",
    tags: [
        {
            name: "exam-results",
            description: "Các API về kết quả bài thi"
        },
        {
            name: "essays",
            description: "Các API về bài thi"
        },
        {
            name: "exam-result-criterias",
            description: "Các API về tiêu chí đánh giá kết quả bài thi"
        },
        {
            name: "exams",
            description: "Các API về đề thi"
        },
        {
            name: "group-leaders",
            description: "Các API về nhóm trưởng"
        },
        {
            name: "question-banks",
            description: "Các API về ngân hàng câu hỏi"
        },
        {
            name: "questions",
            description: "Các API về câu hỏi"
        },
        {
            name: "students",
            description: "Các API về sinh viên"
        },
        {
            name: "teachers",
            description: "Các API về giáo viên"
        },
    ],
    schemes: ["http"],
    paths: {

        // Exam Result API
        "/exam-results/": {
            post: {
                tags: ["exam-results"],
                summary: "Tạo kết quả bài thi",
                description: "",
                operationId: "createexam-results",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "examId": {
                                    "type": "string",
                                    "example": "E00002"
                                },
                                "studentId": {
                                    "type": "string",
                                    "example": "U00001"
                                },
                            },
                        },
                        "description": "Dữ liệu kết quả bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 201 CREATED"
                    },
                },
                security: [
                ]
            }
        },

        "/exam-results/{id}": {
            get: {
                tags: ["exam-results"],
                summary: "Lấy kết quả bài thi theo id",
                description: "",
                operationId: "getexam-resultsById",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID của kết quả bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            },

            put: {
                tags: ["exam-results"],
                summary: "Cập nhật kết quả bài thi",
                description: "",
                operationId: "updateexam-results",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID của kết quả bài thi"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "totalScore": {
                                    "type": "number",
                                    "example": 8
                                },
                                "resultID": {
                                    "type": "string",
                                    "example": "ER00001"
                                },
                            },
                        },
                        "description": "Dữ liệu kết quả bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            },

            delete: {
                tags: ["exam-results"],
                summary: "Xóa kết quả bài thi",
                description: "",
                operationId: "deleteexam-results",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID của kết quả bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            }
        },

        "/exam-results/essays/{id}": {
            get: {
                tags: ["exam-results"],
                summary: "Lấy kết quả bài thi theo id bài thi",
                description: "",
                operationId: "getexam-resultssByEssayId",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID của bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            }
        },

        "/exam-results/essays/{id}/score": {
            get: {
                tags: ["exam-results"],
                summary: "Tính điểm tổng",
                description: "",
                operationId: "calculateOverallScore",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID của bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            }
        },

        "/exam-results/essays/{id}/details": {
            get: {
                tags: ["exam-results"],
                summary: "Lấy chi tiết kết quả bài thi",
                description: "",
                operationId: "getexam-resultsDetails",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "type": "string",
                        "description": "ID của bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            }
        },

        // Essay API
        "/essays/": {
            post: {
                tags: ["essays"],
                summary: "Tạo bài thi",
                description: "",
                operationId: "createEssay",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "examquestionId": {
                                    "type": "string",
                                    "example": "EQ0001"
                                },
                                "studentId": {
                                    "type": "string",
                                    "example": "U00005"
                                },
                                "essayContent": {
                                    "type": "string",
                                    "example": "This is a sample essay"
                                },
                                "submitTime": {
                                    "type": "string",
                                    "example": "2021-01-01 12:00:00"
                                },
                            },
                        },
                        "description": "Dữ liệu bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 201 CREATED"
                    },
                },
                security: [
                ]
            }
        },

        "/essays/{id}": {
            get: {
                tags: ["essays"],
                summary: "Lấy bài thi theo id",
                description: "",
                operationId: "getEssayById",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID của câu hỏi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                    404: {
                        description: "Essay not found"
                    },
                },
            },
        },

        "/essays/exams/{id}": {
            get: {
                tags: ["essays"],
                summary: "Lấy danh sách bài thi theo id của bài thi",
                description: "",
                operationId: "getEssaysByExamId",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID ngân hàng câu hỏi"
                    },
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            }
        },
        
        "/essays/students/{id}": {
            get: {
                tags: ["essays"],
                summary: "Lấy danh sách bài thi theo id của sinh viên",
                description: "",
                operationId: "getEssaysByStudentId",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID ngân hàng câu hỏi"
                    },
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
                security: [
                ]
            }
        },

        "/essays/students/{studentsId}/exams/{examId}": {
            get: {
                tags: ["essays"],
                summary: "Lấy danh sách bài thi theo id của sinh viên và id của bài thi",
                description: "",
                operationId: "getEssaysByStudentAndExamId",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID ngân hàng câu hỏi"
                    },
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
                security: [
                ]
            }
        },

        // Exam Result Criteria API
        "/exam-result-criterias/": {
            post: {
                tags: ["exam-result-criterias"],
                summary: "Tạo tiêu chí đánh giá kết quả bài thi",
                description: "",
                operationId: "createexam-result-criterias",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "essayId": {
                                    "type": "string",
                                    "example": "ES00003"
                                },
                                "detailId": {
                                    "type": "string",
                                    "example": "CD00003"
                                },
                            },
                        },
                        "description": "Dữ liệu tiêu chí đánh giá kết quả bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 201 CREATED"
                    },
                },
            },
        },

        "/exam-result-criterias/results/{id}": {
            get: {
                tags: ["exam-result-criterias"],
                summary: "Lấy tiêu chí đánh giá kết quả bài thi theo id",
                description: "",
                operationId: "getexam-result-criteriasById",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "Id của tiêu chí đánh giá kết quả bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            },
        },

        "/exam-result-criterias/{id}": {
            get: {
                tags: ["exam-result-criterias"],
                summary: "Lấy danh sách tiêu chí đánh giá kết quả bài thi theo id kết quả bài thi",
                description: "",
                operationId: "getexam-result-criteriassByResultId",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "Id của kết quả bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            },

            put: {
                tags: ["exam-result-criterias"],
                summary: "Cập nhật tiêu chí đánh giá kết quả bài thi",
                description: "",
                operationId: "updateexam-result-criterias",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "Id của tiêu chí đánh giá kết quả bài thi"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "score": {
                                    "type": "number",
                                    "example": 8
                                },
                                "resultCriteriaId": {
                                    "type": "string",
                                    "example": "ERC00001"
                                },
                            },
                        },
                        "description": "Dữ liệu tiêu chí đánh giá kết quả bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            },

            delete: {
                tags: ["exam-result-criterias"],
                summary: "Xóa tiêu chí đánh giá kết quả bài thi",
                description: "",
                operationId: "deleteexam-result-criterias",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "Id của tiêu chí đánh giá kết quả bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            }
        },

        // Exam API
        "exams/": {
            post: {
                tags: ["exams"],
                summary: "Tạo bài thi",
                description: "",
                operationId: "createExam",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "examTitle": {
                                    "type": "string",
                                    "example": "English Exam 1"
                                },
                                "description": {
                                    "type": "string",
                                    "example": "First English grammar exam"
                                },
                                "createdBy": {
                                    "type": "string",
                                    "example": "U00003"
                                },
                            },
                        },
                        "description": "Dữ liệu bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 201 CREATED"
                    },
                    404: {
                        description: "Exam not found"
                    },
                },
            },
        },

        "/exams/{id}": {
            get: {
                tags: ["exams"],
                summary: "Lấy thông tin bài thi",
                description: "",
                operationId: "getExamById",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },

                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID của bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                    404: {
                        description: "Exam not found"
                    },
                },
            },

            put: {
                tags: ["exams"],
                summary: "Cập nhật thông tin bài thi",
                description: "",
                operationId: "updateExam",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID của bài thi"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object"
                        },
                        "description": "Dữ liệu bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            },

            delete: {
                tags: ["exams"],
                summary: "Xóa bài thi",
                description: "",
                operationId: "deleteExam",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "type": "string",
                        "description": "ID của bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            },
        },

        // Group Leader API
        "/group-leaders/question-banks/": {
            post: {
                tags: ["group-leaders"],
                summary: "Tạo ngân hàng câu hỏi",
                description: "",
                operationId: "createQuestionBank",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "bankName": {
                                    "type": "string",
                                    "example": "English Grammar"
                                },
                                "description": {
                                    "type": "string",
                                    "example": "Questions related to English grammar"
                                },
                                "createdBy": {
                                    "type": "string",
                                    "example": "U00002"
                                },
                            },
                        },
                        "description": "Dữ liệu ngân hàng câu hỏi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 201 CREATED"
                    },
                },
            },
        },

        "/group-leaders/question-banks/{id}": {
            get: {
                tags: ["group-leaders"],
                summary: "Lấy thông tin ngân hàng câu hỏi",
                description: "",
                operationId: "getQuestionBankById",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID ngân hàng câu hỏi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                    404: {
                        description: "Question bank not found"
                    },
                },
            },

            put: {
                tags: ["group-leaders"],
                summary: "Cập nhật ngân hàng câu hỏi",
                description: "",
                operationId: "updateQuestionBank",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID ngân hàng câu hỏi"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "bankName": {
                                    "type": "string",
                                    "example": "English Grammar"
                                },
                                "description": {
                                    "type": "string",
                                    "example": "Questions related to English grammar"
                                },
                                "createdBy": {
                                    "type": "string",
                                    "example": "U00002"
                                },
                            },
                        },
                        "description": "Dữ liệu câu hỏi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                    404: {
                        description: "Question bank not found"
                    },
                },
            },

            delete: {
                tags: ["group-leaders"],
                summary: "Xóa ngân hàng câu hỏi",
                description: "",
                operationId: "deleteQuestionBank",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID ngân hàng câu hỏi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            }
        },

        // Question Bank API
        "/question-banks/": {
            post: {
                tags: ["question-banks"],
                summary: "Tạo ngân hàng câu hỏi",
                description: "",
                operationId: "createQuestionBank",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "bankName": {
                                    "type": "string",
                                    "example": "English Grammar"
                                },
                                "description": {
                                    "type": "string",
                                    "example": "Questions related to English grammar"
                                },
                                "createdBy": {
                                    "type": "string",
                                    "example": "U00002"
                                },
                            },
                        },
                        "description": "Dữ liệu ngân hàng câu hỏi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 201 CREATED"
                    },
                },
            },
        },

        "/question-banks/{id}": {
            get: {
                tags: ["question-banks"],
                summary: "Lấy thông tin ngân hàng câu hỏi",
                description: "",
                operationId: "getQuestionBankById",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID ngân hàng câu hỏi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                    404: {
                        description: "Question bank not found"
                    },
                },
            },

            put: {
                tags: ["question-banks"],
                summary: "Cập nhật ngân hàng câu hỏi",
                description: "",
                operationId: "updateQuestionBank",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID ngân hàng câu hỏi"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "bankName": {
                                    "type": "string",
                                    "example": "English Grammar"
                                },
                                "description": {
                                    "type": "string",
                                    "example": "Questions related to English grammar"
                                },
                                "createdBy": {
                                    "type": "string",
                                    "example": "U00002"
                                },
                            },
                        },
                        "description": "Dữ liệu câu hỏi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                    404: {
                        description: "Question bank not found"
                    },
                },
            },

            delete: {
                tags: ["question-banks"],
                summary: "Xóa ngân hàng câu hỏi",
                description: "",
                operationId: "deleteQuestionBank",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID ngân hàng câu hỏi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            }
        },

        //  Question API
        "/questions/": {
            post: {
                tags: ["questions"],
                summary: "Tạo câu hỏi",
                description: "",
                operationId: "createQuestion",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "bankId" : {
                                    "type": "string",
                                    "example": "QB00001"
                                },
                                "questionContent": {
                                    "type": "string",
                                    "example": "Hãy viết lại câu sau ở thì quá khứ đơn: I go to school every day."
                                },
                            },
                        },
                        "description": "Dữ liệu câu hỏi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 201 CREATED"
                    },
                },
            },
        },

        "/questions/{id}": {
            get: {
                tags: ["questions"],
                summary: "Lấy thông tin câu hỏi",
                description: "",
                operationId: "getQuestionById",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID của câu hỏi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                    404: {
                        description: "Question not found"
                    },
                },
            },

            put: {
                tags: ["questions"],
                summary: "Cập nhật câu hỏi",
                description: "",
                operationId: "updateQuestion",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID của câu hỏi"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "bankId" : {
                                    "type": "string",
                                    "example": "QB00001"
                                },
                                "questionContent": {
                                    "type": "string",
                                    "example": "Hãy viết lại câu sau ở thì quá khứ đơn: I go to school every day."
                                },
                            },
                        },
                        "description": "Dữ liệu câu hỏi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                    404: {
                        description: "Question not found"
                    },
                },
            },

            delete: {
                tags: ["questions"],
                summary: "Xóa câu hỏi",
                description: "",
                operationId: "deleteQuestion",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID của câu hỏi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            },
        },

        //  Student API
        "/students/essays/": {
            post: {
                tags: ["students"],
                summary: "Nộp bài thi",
                description: "",
                operationId: "submitEssay",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "examquestionId": {
                                    "type": "string",
                                    "example": "EQ00001"
                                },
                                "studentId": {
                                    "type": "string",
                                    "example": "U00001"
                                },
                                "essayContent": {
                                    "type": "string",
                                    "example": "This is my essay"
                                },
                                "submitTime": {
                                    "type": "string",
                                    "example": "2021-05-20T10:00:00Z"
                                },
                            },
                        },
                        "description": "Dữ liệu bài thi" 
                    },
                ],
                responses: {
                    200: {
                        description: "status: 201 CREATED"
                    },
                },
            },
        },

        "/students/exams/{id}/results": {
            get: {
                tags: ["students"],
                summary: "Lấy kết quả bài thi",
                description: "",
                operationId: "getexam-resultss",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID của bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            },
        },

        //  Teacher API
        "/teachers/exams/": {
            post: {
                tags: ["teachers"],
                summary: "Tạo bài thi",
                description: "",
                operationId: "createExam",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "examTitle": {
                                    "type": "string",
                                    "example": "English Exam 1"
                                },
                                "description": {
                                    "type": "string",
                                    "example": "First English grammar exam"
                                },
                                "createdBy": {
                                    "type": "string",
                                    "example": "U00003"
                                },
                            },
                        },
                        "description": "Dữ liệu bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 201 CREATED"
                    },
                    404: {
                        description: "Exam not found"
                    },
                },
            },
        },

        "/teachers/exams/{id}": {
            get: {
                tags: ["teachers"],
                summary: "Lấy thông tin bài thi",
                description: "",
                operationId: "getExamById",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },

                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID của bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                    404: {
                        description: "Exam not found"
                    },
                },
            },

            put: {
                tags: ["teachers"],
                summary: "Cập nhật thông tin bài thi",
                description: "",
                operationId: "updateExam",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": true,
                        "type": "string",
                        "description": "ID của bài thi"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object"
                        },
                        "description": "Dữ liệu bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            },

            delete: {
                tags: ["teachers"],
                summary: "Xóa bài thi",
                description: "",
                operationId: "deleteExam",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "type": "string",
                        "description": "ID của bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            },
        },

        "/teachers/essays/grade-score/{examId}/{studentId}": {
            post: {
                tags: ["teachers"],
                summary: "Đánh giá bài thi",
                description: "",
                operationId: "gradeEssay",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "header",
                        "name": "Authorization",
                        "required": true,
                        "type": "string",
                        "description": "Bearer token"
                    },
                    {
                        "in": "path",
                        "name": "examId",
                        "required": "true",
                        "type": "string",
                        "description": "ID của bài thi"
                    },
                    {
                        "in": "path",
                        "name": "studentId",
                        "required": "true",
                        "type": "string",
                        "description": "ID của sinh viên"
                    }
                ],
                responses: {
                    200: {
                        description: "Essay graded successfully"
                    },
                },
            },
        },

        //User API
        "/users/": {
            post: {
                tags: ["users"],
                summary: "Tạo người dùng",
                description: "",
                operationId: "createUser",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "username": {
                                    "type": "string",
                                    "example": "user1@example.com"
                                },
                                "password": {
                                    "type": "string",
                                    "example": "123456"
                                },
                                "role": {
                                    "type": "string",
                                    "example": "Student"
                                },
                                "fullName": {
                                    "type": "string",
                                    "example": "Nguyen Van A"
                                },
                                "birthday": {
                                    "type": "string",
                                    "format": "date",
                                    "example": "1999-01-01"
                                },
                                "gender": {
                                    "type": "string",
                                    "example": "Male"
                                }
                            },
                            "required": ["username", "password", "role", "fullName", "birthday"]
                        },
                        "description": "Dữ liệu người dùng"
                    }
                ],
                responses: {
                    201: {
                        description: "status: 201 CREATED"
                    },
                },
            },
        },

        "/users/name/{name}": {
            get: {
                tags: ["users"],
                summary: "Lấy thông tin người dùng",
                description: "",
                operationId: "getByUsername",
                produces: ["application/json"],
                consumes: ["application/json"],
                parameters: [
                    {
                        "name": "name",
                        "in": "path",
                        "required": true,
                        "type": "string",
                        "description": "username"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                    404: {
                        description: "User not found"
                    }
                },
            },
        },

        "/users/{id}": {
            get: {
                tags: ["users"],
                summary: "Lấy thông tin người dùng",
                description: "",
                operationId: "getUserById",
                produces: ["application/json"],
                consume: ["application/json"],
                parameters: [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "string",
                        "description": "ID của người dùng"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                    404: {
                        description: "User not found"
                    }
                },
            },

            put: {
                tags: ["users"],
                summary: "Cập nhật thông tin người dùng",
                description: "",
                operationId: "updateUser",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "string",
                        "description": "ID của người dùng"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "fullName": {
                                    "type": "string",
                                    "example": "Nguyen Van A",
                                },
                                "birthday": {
                                    "type": "string",
                                    "format": "date",
                                    "example": "1999-01-01"
                                },
                                "gender": {
                                    "type": "string",
                                    "example": "Male",
                                }
                        },
                        "description": "Dữ liệu người dùng"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                    404: {
                        description: "User not found"
                    }
                },
            },

            delete: {
                tags: ["users"],
                summary: "Xóa người dùng",
                description: "",
                operationId: "deleteUser",
                produces: ["application/json"],
                consumes: ["application/json"],
                parameters: [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "string",
                        "description": "ID của người dùng"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            },
        },

        "/users/login": {
            post: {
                tags: ["users"],
                summary: "Đăng nhập",
                description: "",
                operationId: "loginUser",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "body",
                        "name": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "username": {
                                    "type": "string",
                                    "example": "user1@example.com"
                                },
                                "password": {
                                    "type": "string",
                                    "example": "123456"
                                }
                            },
                        },
                        "description": "Dữ liệu đăng nhập"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            },
        },
    },
};
