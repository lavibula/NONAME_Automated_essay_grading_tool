const path = require('path')
const morgan = require('morgan');
const express = require('express');
const { engine } = require ('express-handlebars');
const app = express();
const port = 3001;

// add middleware để xử lí thông tin đươc gửi từ client
app.use(express.urlencoded(
  {extended:true}
)); // data được gửi dưới dạng form
app.use(express.json()); // data được gửi bằng file json?

app.use(express.static(path.join(__dirname, 'public'))) 
// nếu gặp đường dẫn kiểu ../img/image.jpg thì nó sẽ check thư mục public

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine('.hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));


// console.log('PATH', path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => {
    return res.render('home');
})

app.get('/news', (req, res) => {
    return res.render('news');
})

// app.get là đang tạo route cho method get
app.get('/search', (req, res) => {
  console.log(req.query);
  return res.render('search');
})

app.post('/search', (req, res) => {
  console.log(req.body);
  return res.send('');
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})