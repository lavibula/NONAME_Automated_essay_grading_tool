var spec = {
    swagger: "2.0",
    info: {
        description: "Các thông tin mô tả về dự án và API",
        version: "1.0",
        title: "Tên dự án"
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
            name: "questions-banks",
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
                        "in": "body",
                        "name": "body",
                        "required": "true",
                        "schema": {
                            "type": "object"
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
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "ID của kết quả bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
                security: [
                ]
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
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "ID của kết quả bài thi"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": "true",
                        "schema": {
                            "type": "object"
                        },
                        "description": "Dữ liệu kết quả bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
                security: [
                ]
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
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "ID của kết quả bài thi"
                    }
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
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "ID của bài thi"
                    }
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
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "ID của bài thi"
                    }
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
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "ID của bài thi"
                    }
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
                        "in": "body",
                        "name": "body",
                        "required": "true",
                        "schema": {
                            "type": "object"
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
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "ID của bài thi"
                    }
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
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "schema": { "type": "string" },
                        "description": "ID của bài thi"
                    }
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
        "/essays/studentss/{id}": {
            get: {
                tags: ["essays"],
                summary: "Lấy danh sách bài thi theo id của sinh viên",
                description: "",
                operationId: "getEssaysByStudentId",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "schema": { "type": "string" },
                        "description": "ID của sinh viên"
                    }
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
        "/essays/{id}": {
            put: {
                tags: ["essays"],
                summary: "Cập nhật bài thi",
                description: "",
                operationId: "updateEssay",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "schema": { "type": "string" },
                        "description": "ID của bài thi"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": "true",
                        "schema": { "type": "object" },
                        "description": "Dữ liệu cập nhật bài thi"
                    }
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
        "/essays/{id}": {
            delete: {
                tags: ["essays"],
                summary: "Xóa bài thi",
                description: "",
                operationId: "deleteEssay",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "schema": { "type": "string" },
                        "description": "ID của bài thi"
                    }
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
        "/essays/studentss/{studentsId}/exams/{examId}": {
            get: {
                tags: ["essays"],
                summary: "Lấy danh sách bài thi theo id của sinh viên và id của bài thi",
                description: "",
                operationId: "getEssaysByStudentAndExamId",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "studentsId",
                        "required": "true",
                        "schema": { "type": "string" },
                        "description": "ID của sinh viên"
                    },
                    {
                        "in": "path",
                        "name": "examId",
                        "required": "true",
                        "schema": { "type": "string" },
                        "description": "ID của bài thi"
                    }
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
                        "in": "body",
                        "name": "body",
                        "required": "true",
                        "schema": {
                            "type": "object"
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
            get: {
                tags: ["exam-result-criterias"],
                summary: "Lấy tiêu chí đánh giá kết quả bài thi theo id",
                description: "",
                operationId: "getexam-result-criteriasById",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
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
        "/exam-result-criterias/results/{id}": {
            get: {
                tags: ["exam-result-criterias"],
                summary: "Lấy danh sách tiêu chí đánh giá kết quả bài thi theo id kết quả bài thi",
                description: "",
                operationId: "getexam-result-criteriassByResultId",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "type": "string",
                        "description": "Id của kết quả bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            }
        },
        "/exam-result-criterias/{id}": {
            put: {
                tags: ["exam-result-criterias"],
                summary: "Cập nhật tiêu chí đánh giá kết quả bài thi",
                description: "",
                operationId: "updateexam-result-criterias",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "type": "string",
                        "description": "Id của tiêu chí đánh giá kết quả bài thi"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": "true",
                        "schema": {
                            "type": "object"
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
                        "in": "path",
                        "name": "id",
                        "required": "true",
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
        "/exams/": {
            post: {
                tags: ["exams"],
                summary: "Tạo đề thi",
                description: "",
                operationId: "createExam",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "body",
                        "name": "body",
                        "required": "true",
                        "schema": {
                            "type": "object"
                        },
                        "description": "Dữ liệu đề thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 201 CREATED"
                    },
                },
            },
            get: {
                tags: ["exams"],
                summary: "Lấy thông tin đề thi",
                description: "",
                operationId: "getExamById",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "type": "string",
                        "description": "ID của đề thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                    404: {
                        description: "status: 404 NOT FOUND"
                    },
                },
            },
            put: {
                tags: ["exams"],
                summary: "Cập nhật thông tin đề thi",
                description: "",
                operationId: "updateExam",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "type": "string",
                        "description": "ID của đề thi"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": "true",
                        "schema": {
                            "type": "object"
                        },
                        "description": "Dữ liệu cập nhật đề thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                    404: {
                        description: "status: 404 NOT FOUND"
                    },
                },
            },
            delete: {
                tags: ["exams"],
                summary: "Xóa đề thi",
                description: "",
                operationId: "deleteExam",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "type": "string",
                        "description": "ID của đề thi"
                    }
                ],
                responses: {
                    204: {
                        description: "status: 204 NO CONTENT"
                    },
                    404: {
                        description: "status: 404 NOT FOUND"
                    },
                },
            }
        },
        "/group-leaders/questions-banks/": {
            post: {
                tags: ["group-leaders"],
                summary: "Tạo ngân hàng câu hỏi",
                description: "",
                operationId: "createQuestionBank",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "body",
                        "name": "body",
                        "required": "true",
                        "schema": {
                            "type": "object"
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
            get: {
                tags: ["group-leaders"],
                summary: "Lấy thông tin ngân hàng câu hỏi",
                description: "",
                operationId: "getQuestionBankById",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "type": "string",
                        "description": "ID ngân hàng câu hỏi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
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
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "type": "string",
                        "description": "ID ngân hàng câu hỏi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
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
                        "in": "path",
                        "name": "id",
                        "required": "true",
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
        "/questions-banks/": {
            post: {
                tags: ["questions-banks"],
                summary: "Tạo ngân hàng câu hỏi",
                description: "",
                operationId: "createQuestionBank",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "body",
                        "name": "body",
                        "required": "true",
                        "schema": {
                            "type": "object"
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
            get: {
                tags: ["questions-banks"],
                summary: "Lấy thông tin ngân hàng câu hỏi",
                description: "",
                operationId: "getQuestionBankById",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "type": "string",
                        "description": "ID ngân hàng câu hỏi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            },
            put: {
                tags: ["questions-banks"],
                summary: "Cập nhật ngân hàng câu hỏi",
                description: "",
                operationId: "updateQuestionBank",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "type": "string",
                        "description": "ID ngân hàng câu hỏi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            },
            delete: {
                tags: ["questions-banks"],
                summary: "Xóa ngân hàng câu hỏi",
                description: "",
                operationId: "deleteQuestionBank",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
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
                        "in": "body",
                        "name": "body",
                        "required": "true",
                        "schema": {
                            "type": "object"
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
            get: {
                tags: ["questions"],
                summary: "Lấy thông tin câu hỏi",
                description: "",
                operationId: "getQuestionById",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
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
            put: {
                tags: ["questions"],
                summary: "Cập nhật câu hỏi",
                description: "",
                operationId: "updateQuestion",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "type": "string",
                        "description": "ID của câu hỏi"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": "true",
                        "schema": {
                            "type": "object"
                        },
                        "description": "Dữ liệu câu hỏi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
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
                        "in": "path",
                        "name": "id",
                        "required": "true",
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
                        "in": "body",
                        "name": "body",
                        "required": "true",
                        "schema": {
                            "type": "object"
                        },
                        "description": "Dữ liệu bài thi"
                    }
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
                        "in": "body",
                        "name": "body",
                        "required": "true",
                        "schema": {
                            "type": "object"
                        },
                        "description": "Dữ liệu bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 201 CREATED"
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
            put: {
                tags: ["teachers"],
                summary: "Cập nhật thông tin bài thi",
                description: "",
                operationId: "updateExam",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "type": "string",
                        "description": "ID của bài thi"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": "true",
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
        "/teachers/essays/{id}/grade": {
            post: {
                tags: ["teachers"],
                summary: "Đánh giá bài thi",
                description: "",
                operationId: "gradeEssay",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "type": "string",
                        "description": "ID của bài thi"
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "required": "true",
                        "schema": {
                            "type": "object"
                        },
                        "description": "Dữ liệu bài thi"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 201 CREATED"
                    },
                },
            },
        },
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
                        "required": "true",
                        "schema": {
                            "type": "object"
                        },
                        "description": "Dữ liệu người dùng"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 201 CREATED"
                    },
                },
            },
            get: {
                tags: ["users"],
                summary: "Lấy thông tin người dùng",
                description: "",
                operationId: "getUserById",
                produces: ["application/json"],
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
        "/users/name/{name}": {
            get: {
                tags: ["users"],
                summary: "Lấy thông tin người dùng",
                description: "",
                operationId: "getByUsername",
                produces: ["application/json"],
                parameters: [
                    {
                        "name": "name",
                        "in": "path",
                        "required": true,
                        "type": "string",
                        "description": "Tên đăng nhập của người dùng"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            },
        },
        "/users/{id}": {
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
                        "required": "true",
                        "schema": {
                            "type": "object"
                        },
                        "description": "Dữ liệu người dùng"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 200 OK"
                    },
                },
            },
            delete: {
                tags: ["users"],
                summary: "Xóa người dùng",
                description: "",
                operationId: "deleteUser",
                produces: ["application/json"],
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
                        "required": "true",
                        "schema": {
                            "type": "object"
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
