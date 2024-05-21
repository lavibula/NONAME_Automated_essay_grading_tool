const path = require('path');
const morgan = require('morgan');
const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const port = 3001;

const route = require('./routes'); // đầy đủ là ./routes/index.js

const db = require("./config/db");
// connect to DB
db.connect();

// add middleware để xử lí thông tin đươc gửi từ client
app.use(express.urlencoded({ extended: true })); // data được gửi dưới dạng form
app.use(express.json()); // data được gửi bằng file json?

app.use(express.static(path.join(__dirname, 'public')));
// nếu gặp đường dẫn kiểu ../img/image.jpg thì nó sẽ check thư mục public

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources','views'));

// app.get('/user-profile', (req, res) => {
//     return res.render('user_profile');
// })
// routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
