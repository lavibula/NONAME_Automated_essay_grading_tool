// const path = require('path');
// const morgan = require('morgan');
// const express = require('express');
// const { engine } = require('express-handlebars');
// const app = express();
// const port = 3001;

// // const route = require('./routes'); // đầy đủ là ./routes/index.js

// const db = require("./config/db");
// // connect to DB
// db.connect();

// // add middleware để xử lí thông tin đươc gửi từ client
// app.use(express.urlencoded({ extended: true })); // data được gửi dưới dạng form
// app.use(express.json()); // data được gửi bằng file json?

// app.use(express.static(path.join(__dirname, 'public')));
// // nếu gặp đường dẫn kiểu ../img/image.jpg thì nó sẽ check thư mục public

// // HTTP logger
// // app.use(morgan('combined'));

// // Template engine
// app.engine(
//     '.hbs',
//     engine({
//         extname: '.hbs',
//         helpers: {
//             eachInRange: function(n, context, options) {
//                 let result = '';
//                 for (let i = 0; i < n; i++) {
//                     result += options.fn(context[i]);
//                 }
//                 return result;
//             }
//         }
//     }),
// );
// app.set('view engine', '.hbs');
// app.set('views', path.join(__dirname, 'resources','views'));


// // app.get('/user-profile', (req, res) => {
// //     return res.render('user_profile');
// // })
// // routes init
// // app.post('/search', (req, res, next) => {
// //     // console.log(req.body);
// //     var username = req.body.username;
// //     var password = req.body.password;
// //     console.log(username, password);

// //     //check & render home

// //     res.render('home');
// // })

// app.get('/user-profile', (req, res) => {
//     return res.render('user_profile');
// })

// app.get('/group-leader', (req, res) => {
//     return res.render('groupLeader');
// })

// app.post('/login', (req, res, next) => {
//     var username = req.body.username;
//     var password = req.body.password;
//     console.log(username, password);

//     // Fake user data for example purposes
//     const user = {
//         username: 'testuser',
//         password: 'password123'
//     };

//     // Check username and password
//     if (username === user.username && password === user.password) {
//         // If credentials are valid, render the home page
//         res.render('login', { title: 'Home' });
//     } else {
//         // If credentials are invalid, re-render the login page with an error message
//         // res.render('search', { 
//         //     title: 'Đăng Nhập', 
//         //     error: 'Tên tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.' 
//         // });
//         // res.render('login', { title: 'Đăng Nhập', noSidebar: true });
//         res.send('Tên tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.');
//     }
// })

// // route(app);

// app.listen(port, () => {
//     console.log(`App listening on port http://localhost:${port}`);
// });

// const path = require('path');
// const express = require('express');
// const { engine, create } = require('express-handlebars');
// const morgan = require('morgan');
// // const db = require('./config/db');
// const app = express();
// const port = 3001;

// // Connect to DB


// // Add middleware to handle data sent from the client
// app.use(express.urlencoded({ extended: true })); // Data sent as form
// app.use(express.json()); // Data sent as JSON

// app.use(express.static(path.join(__dirname, 'public')));

// // HTTP logger
// // app.use(morgan('combined'));

// // Create a handlebars instance and register the helper
// const hbs = create({
//     extname: '.hbs',
//     helpers: {
//         eachInRange: function(n, context, options) {
//             let result = '';
//             for (let i = 0; i < n; i++) {
//                 result += options.fn(context[i]);
//             }
//             return result;
//         }
//     }
// });

// // Template engine
// app.engine('.hbs', hbs.engine);
// app.set('view engine', '.hbs');
// app.set('views', path.join(__dirname, 'resources', 'views'));

// // Route handlers
// app.get('/user-profile', (req, res) => {
//     return res.render('user_profile');
// });

// app.get('/group-leader', (req, res) => {
//     return res.render('groupLeader');
// });

// app.post('/login', (req, res, next) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     console.log(username, password);

//     // Fake user data for example purposes
//     const user = {
//         username: 'testuser',
//         password: 'password123'
//     };

//     // Check username and password
//     if (username === user.username && password === user.password) {
//         // If credentials are valid, render the home page
//         res.render('login', { title: 'Home' });
//     } else {
//         // If credentials are invalid, re-render the login page with an error message
//         res.send('Tên tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.');
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`App listening on port http://localhost:${port}`);
// });
const path = require('path');
const express = require('express');
const { engine, create } = require('express-handlebars');
const morgan = require('morgan');
// const db = require('./config/db'); // Commented out to remove Mongoose dependency
const app = express();
const port = 3002; // Changed port number

// Middleware to handle data sent from the client
app.use(express.urlencoded({ extended: true })); // Data sent as form
app.use(express.json()); // Data sent as JSON

app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
// app.use(morgan('combined'));

// Create a Handlebars instance and register the helper
const hbs = create({
    extname: '.hbs',
    helpers: {
        eachInRange: function(n, context, options) {
            let result = '';
            for (let i = 0; i < n; i++) {
                result += options.fn(context[i]);
            }
            return result;
        }
    }
});

// Template engine
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route handlers
app.get('/user-profile', (req, res) => {
    return res.render('user_profile');
});

app.get('/group-leader', (req, res) => {
    return res.render('groupLeader');
});

app.get('/student', (req, res) => {
    return res.render('student');
});

app.get('/admin', (req, res) => {
    return res.render('admin');
});

app.get('/login', (req, res, next) => {
    res.render('login');

});

app.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);

    // Fake user data for example purposes
    const user = {
        username: 'testuser',
        password: 'password123'
    };

    // Check username and password
    if (username === user.username && password === user.password) {
        // If credentials are valid, render the home page
        res.render('student', { title: 'student' });
    } else {
        // If credentials are invalid, re-render the login page with an error message
        // res.send('Tên tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.');
        res.render('login_invalid');

    }
});


// Start the server
app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
