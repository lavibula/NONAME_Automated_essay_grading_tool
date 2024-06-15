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

const { engine } = require('express-handlebars');
const path = require('path');

console.log("dirname",__dirname);
const dir = "D:\\Empty\\NONAME_Automated_essay_grading_tool";
const app = express();
app.use(express.static(path.join(dir, 'front-end', 'assets')));

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.use(errorHandler.handle);


app.engine('.hbs', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(dir, 'front-end', 'views', 'layouts'),
  extname: '.hbs',
  helpers: {
      json: function (context) {
          return JSON.stringify(context);
      }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(dir, 'front-end', 'views'));

app.get('/',(req,res)=>{
  res.render('login',{
      style:'login.css',
      noSidebar: true,
  })
})

app.post('/', (req, res) => {
  const { username, password } = req.body;
  console.log("loginnnn: ",username, password );
});

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