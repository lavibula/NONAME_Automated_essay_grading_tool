const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const config = require('./config/config');
const sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {
  host: config.database.host,
  dialect: config.database.dialect
});

// Import các model và khởi tạo db
const db = require('./models'); // Đảm bảo rằng đường dẫn đến models chính xác

// Chuyển db vào route userRoutes.js
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes')(db);
const questionBankRoutes = require('./routes/questionBankRoutes');
const questionRoutes = require('./routes/questionRoutes');
const examRoutes = require('./routes/examRoutes');
const essayRoutes = require('./routes/essayRoutes');
const examQuestionRoutes = require('./routes/examQuestionRoutes');

const app = express();
const port = process.env.PORT || config.port; // Use config.port

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection (Using Sequelize)
sequelize
  .authenticate()
  .then(() => {
    console.log('Kết nối PostgreSQL thành công');
    sequelize.sync(); // Synchronize models with database
  })
  .catch(err => console.error('Lỗi kết nối PostgreSQL:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/question-banks', questionBankRoutes);
app.use('/questions', questionRoutes);
app.use('/exams', examRoutes);
app.use('/essays', essayRoutes);
app.use('/exam-questions', examQuestionRoutes);

app.listen(port, () => {
  console.log(`Máy chủ đang lắng nghe trên cổng ${port}`);
});
