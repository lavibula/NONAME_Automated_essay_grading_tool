const newsRouter = require('./news');
const siteRouter = require('./site');
const user_profile_Router = require('./user_profile');

function route(app) {
    app.get('/user-profile', (req, res) => {
        return res.render('user_profile');
    })
    app.use('/news', newsRouter);
    app.use('/user-profile', user_profile_Router);
    app.use('/', siteRouter);
}

module.exports = route;
