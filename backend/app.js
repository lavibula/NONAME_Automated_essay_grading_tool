const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const groupLeaderRoutes = require('./routes/groupLeaderRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const config = require('./config/config');
const errorHandler = require('./utils/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler.handle);

app.use('/', userRoutes);
app.use('/', groupLeaderRoutes);
app.use('/', teacherRoutes);
app.use('/', studentRoutes);


app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});