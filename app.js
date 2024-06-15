const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const groupLeaderRoutes = require('./routes/groupLeaderRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const questionBankRoutes = require('./routes/questionBankRoutes');
const questionRoutes = require('./routes/questionRoutes');
const examRoutes = require('./routes/examRoutes');
const essayRoutes = require('./routes/essayRoutes');
const examResultRoutes = require('./routes/examResultRoutes');
const examResultCriteriaRoutes = require('./routes/examResultCriteriaRoutes');
const config = require('./config/config');
const errorHandler = require('./utils/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler.handle);

app.use('/users', userRoutes);
app.use('/group-leaders', groupLeaderRoutes);
app.use('/teachers', teacherRoutes);
app.use('/students', studentRoutes);
app.use('/question-banks', questionBankRoutes);
app.use('/questions', questionRoutes);
app.use('/exams', examRoutes);
app.use('/essays', essayRoutes);
app.use('/exam-results', examResultRoutes);
app.use('/exam-result-criterias', examResultCriteriaRoutes);

app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});