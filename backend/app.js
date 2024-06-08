const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const db = require('./database/db');
const errorHandler = require('./utils/errorHandler');

const app = express();
const port = config.port;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
db.connect();

// Routes
const authMiddleware = require('../backend/utils/auth');
const usersRouter = require('./routes/userRoutes');
const questionBanksRouter = require('./routes/questionBankRoutes');
const questionsRouter = require('./routes/questionRoutes');
const criteriasRouter = require('./routes/criteriaRoutes');
const examsRouter = require('./routes/examRoutes');
const examQuestionsRouter = require('./routes/examQuestionsRoutes');
const essaysRouter = require('./routes/essayRoutes');
const examResultsRouter = require('./routes/examResultsRoutes');
const examResultCriteriasRouter = require('./routes/examResultCriteriasRoutes');
const criteriaDetailRouter = require('./routes/criteriaDetailRoutes');

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', usersRouter);
app.use('/questionbanks', questionBanksRouter);
app.use('/questions', questionsRouter);
app.use('/criterias', criteriasRouter);
app.use('/exams', examsRouter);
app.use('/examquestions', examQuestionsRouter);
app.use('/essays', essaysRouter);
app.use('/examresults', examResultsRouter);
app.use('/examresultcriterias', examResultCriteriasRouter);
app.use('/criteriadetail', criteriaDetailRouter);

// Error handling middleware
app.use(errorHandler.handle);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
