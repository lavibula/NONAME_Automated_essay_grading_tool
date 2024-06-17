const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const groupLeaderRoutes = require('./routes/groupLeaderRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
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
    incrementIndex: function (index) {
      return index + 1;
    },
    json: function (context) {
      return JSON.stringify(context);
    },
    formatDate: function (dateString) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('vi-VN', options);
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

app.get('/mylibraryteacher',(req,res)=>{
  res.render('mylibraryteacher',{
      style: 'mylibraryteacher.css'
  })
})

app.use('/', userRoutes);
app.use('/group-leaders/', groupLeaderRoutes);
app.use('/', teacherRoutes);
app.use('/students', studentRoutes);

app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});