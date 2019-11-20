const User = require('../Model/UserModel');

module.exports = {
    get: (req, res) => {
        User.getAllUser(req.app.locals.db).then((Users) => {
            res.json(Users);
        });
    },
    getUser: (req, res) => {
        User.getUserByID(req.app.locals.db, req.params.username).then(Users => {
            res.json(Users);
        });
    },
    update: (req, res) => {
        User.updateUserByID(req.app.locals.db, req.body, (err, result) => {
            if (err)
                console.log(err);
            res.json(result);
        });
    },
    delete: (req, res) => {
        User.deleteUserByID(req.app.locals.db, req.body, (err, result) => {
            if (err)
                console.log(err);
            res.json(result);
        });
    },
    login: (req, res) => {
        User.checkLogin(req.app.locals.db, req.body).then(user => {
            if (user) {
                res.json(user);
            }
            else {
                res.json(false);
            }
        })
    },
    
}