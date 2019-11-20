const ObjectId = require('mongodb').ObjectID;
module.exports = {
    getAllUser: (db) => {
        return db.collection("User").find({ delete: { $ne: true } }).toArray();
    },
    getUser: (db, username) => {
        return db.collection("User").find({ username: username, delete: { $ne: true } }).toArray();
    },
    updateUserByID: (db, User, callback) => {
        User.created = new Date();
        db.collection("User").updateOne({ user: User.user }, { $set: User }, { upsert: true }, callback);
    },
    deleteUserByID: (db, User, callback) => {
        db.collection("User").updateOne({ user: ObjectId(User.userName) }, { $set: { delete: true } }, callback);
    },
    checkLogin: (db, User) => {
        return db.collection("User").findOne({ $and: [{ username: User.username }, { password: User.password }] });
    }
}



