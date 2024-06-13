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

function authMiddleware(req, res, next){
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
            // res.render('student', 
            //     { title: 'student',
            //     'style': 'login.css'
            //     });
        next()
    } else {
        // If credentials are invalid, re-render the login page with an error message
        // res.send('Tên tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.');
        res.render('login_invalid',
            {
                'style': 'login.css',
                noSidebar:true,
            }
        );

    }
}

app.get('/login', (req, res, next) => {
    res.render('login',
        {'style': 'login.css',
            noSidebar:true,
        }
    );
});

app.post('/login', (req, res, next) => {
    res.redirect('/student')
    // res.render('login',
    //     {'style': 'login.css',
    //         noSidebar:true,
    //     }
    // );
});

app.get('/student', authMiddleware, (req, res) => {
    return res.render('student',
        {
            'style': 'student.css'
        }
    );
});

// Route handlers
app.get('/user-profile', (req, res) => {
    return res.render('user_profile',
        {'style': 'user_profile.css'
        }
    );
}); 

app.get('/group-leader', authMiddleware, (req, res) => {
    return res.render('groupLeader',
        {'style': 'group_leader.css'
        }
    );
});



app.get('/teacher', (req, res) => {
    return res.render('teacher',
        {'style': 'teacher.css'
        }
    );
});

app.get('/admin', (req, res) => {
    return res.render('admin',
        {'style': 'admin.css'
        }
    );
});



// Start the server
app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});

// const express = require('express')
// const app = express() 

// app.use(logger);

// app.get('/', (req, res) => {
//     res.send('Home Page')
// })

// app.get('/users', 
//     checkAuth,
//     function (req, res, next) {
//         res.send('Users Page')
// })
// function checkAuth(req, res, next) {
//     if (req.query.auth === 'true'){
//         next()
//     }
//     else{
//         res.send("NOT AUTH")
//     }
// }
// function logger(req, res, next) { 
//     console.log('Log')
//     next()
// }
// app.listen(3002)