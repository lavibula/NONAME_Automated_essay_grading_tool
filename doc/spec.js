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
            name: "examResult",
            description: "Các API về kết quả bài thi"
        },
        {
            name: "essay",
            description: "Các API về bài thi"
        },
        {
            name: "examResultCriteria",
            description: "Các API về tiêu chí đánh giá kết quả bài thi"
        },
        {
            name: "exam",
            description: "Các API về đề thi"
        },
        {
            name: "groupLeader",
            description: "Các API về nhóm trưởng"
        },
        {
            name: "questionBank",
            description: "Các API về ngân hàng câu hỏi"
        },
        {
            name: "question",
            description: "Các API về câu hỏi"
        },
        {
            name: "student",
            description: "Các API về sinh viên"
        },
        {
            name: "teacher",
            description: "Các API về giáo viên"
        },
    ],
    schemes: ["http"],
    paths: {
        "/examResult/": {
            post: {
                tags: ["examResult"],
                summary: "Tạo kết quả bài thi",
                description: "",
                operationId: "createExamResult",
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
        "/examResult/{id}": {
            get: {
                tags: ["examResult"],
                summary: "Lấy kết quả bài thi theo id",
                description: "",
                operationId: "getExamResultById",
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
                tags: ["examResult"],
                summary: "Cập nhật kết quả bài thi",
                description: "",
                operationId: "updateExamResult",
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
                tags: ["examResult"],
                summary: "Xóa kết quả bài thi",
                description: "",
                operationId: "deleteExamResult",
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
        "/examResult/essays/{id}": {
            get: {
                tags: ["examResult"],
                summary: "Lấy kết quả bài thi theo id bài thi",
                description: "",
                operationId: "getExamResultsByEssayId",
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
        "/examResult/essays/{id}/score": {
            get: {
                tags: ["examResult"],
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
        "/examResult/essays/{id}/details": {
            get: {
                tags: ["examResult"],
                summary: "Lấy chi tiết kết quả bài thi",
                description: "",
                operationId: "getExamResultDetails",
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
        "/essay/": {
            post: {
                tags: ["essay"],
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
        "/essay/{id}": {
            get: {
                tags: ["essay"],
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
        "/essay/exams/{id}": {
            get: {
                tags: ["essay"],
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
        "/essay/students/{id}": {
            get: {
                tags: ["essay"],
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
        "/essay/{id}": {
            put: {
                tags: ["essay"],
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
        "/essay/{id}": {
            delete: {
                tags: ["essay"],
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
        "/essay/students/{studentId}/exams/{examId}": {
            get: {
                tags: ["essay"],
                summary: "Lấy danh sách bài thi theo id của sinh viên và id của bài thi",
                description: "",
                operationId: "getEssaysByStudentAndExamId",
                consumes: ["application/json"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "studentId",
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
        "/examResultCriteria/": {
            post: {
                tags: ["examResultCriteria"],
                summary: "Tạo tiêu chí đánh giá kết quả bài thi",
                description: "",
                operationId: "createExamResultCriteria",
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
                tags: ["examResultCriteria"],
                summary: "Lấy tiêu chí đánh giá kết quả bài thi theo id",
                description: "",
                operationId: "getExamResultCriteriaById",
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
        "/examResultCriteria/results/{id}": {
            get: {
                tags: ["examResultCriteria"],
                summary: "Lấy danh sách tiêu chí đánh giá kết quả bài thi theo id kết quả bài thi",
                description: "",
                operationId: "getExamResultCriteriasByResultId",
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
        "/examResultCriteria/{id}": {
            put: {
                tags: ["examResultCriteria"],
                summary: "Cập nhật tiêu chí đánh giá kết quả bài thi",
                description: "",
                operationId: "updateExamResultCriteria",
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
                tags: ["examResultCriteria"],
                summary: "Xóa tiêu chí đánh giá kết quả bài thi",
                description: "",
                operationId: "deleteExamResultCriteria",
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
        "/exam/": {
            post: {
                tags: ["exam"],
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
                tags: ["exam"],
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
                tags: ["exam"],
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
                tags: ["exam"],
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
        "/groupLeader/question-banks/": {
            post: {
                tags: ["groupLeader"],
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
                tags: ["groupLeader"],
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
                tags: ["groupLeader"],
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
                tags: ["groupLeader"],
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
        "/questionBank/": {
            post: {
                tags: ["questionBank"],
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
                tags: ["questionBank"],
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
                tags: ["questionBank"],
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
                tags: ["questionBank"],
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
        "/question/": {
            post: {
                tags: ["question"],
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
                tags: ["question"],
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
                tags: ["question"],
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
                tags: ["question"],
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
        "/student/essays/": {
            post: {
                tags: ["student"],
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
        "/student/exams/{id}/results": {
            get: {
                tags: ["student"],
                summary: "Lấy kết quả bài thi",
                description: "",
                operationId: "getExamResults",
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
        "/teacher/exams/": {
            post: {
                tags: ["teacher"],
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
        "/teacher/exams/{id}": {
            get: {
                tags: ["teacher"],
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
                tags: ["teacher"],
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
                tags: ["teacher"],
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
        "/teacher/essays/{id}/grade": {
            post: {
                tags: ["teacher"],
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
        "/user/": {
            post: {
                tags: ["user"],
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
                tags: ["user"],
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
        "/user/name/{name}": {
            get: {
                tags: ["user"],
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
        "/user/{id}": {
            put: {
                tags: ["user"],
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
                tags: ["user"],
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
        "/user/login": {
            post: {
                tags: ["user"],
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
