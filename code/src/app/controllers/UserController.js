// const user = require("../models/User");

// class UserController {

//     // // [GET] / user_profile
//     // user_profile(req, res, next) {
//     //     // user.find({})
//     //     //     .then(users => {
//     //     //         users = users.map(user => user.toObject())
//     //     //         res.render('user_profile', {users})
//     //     //     })
//     //     //     .catch(next);
//     //     res.render('user_profile');
//     // }

//     user_profile(req, res) {
//         res.render('user_profile');
//     }
// }

// module.exports = new UserController();

const user = require("../models/User");

class UserController {
    
    // [GET] /user-profile
    user_profile(req, res) {
        res.render('user_profile');
    }

    // Uncomment this method to fetch and render user data from the database
    // user_profile(req, res, next) {
    //     user.find({})
    //         .then(users => {
    //             users = users.map(user => user.toObject());
    //             res.render('user_profile', { users });
    //         })
    //         .catch(next);
    // }
}

module.exports = new UserController();
