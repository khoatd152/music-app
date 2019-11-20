const ObjectId = require('mongodb').ObjectID;
module.exports = {
    getAllAlbum: (db) => {
        return db.collection("Album").find({ delete: { $ne: true } }).toArray();
    },
    updateAlbumByID: (db, album, callback) => {
        if (album._id) { //existing 
            let _id = album._id;
            delete album._id;
            db.collection("Album").updateOne({ _id: ObjectId(_id) }, { $set: album }, callback);
        }
        else {
            db.collection("Album").insert(album, callback);
        }
    },
    deleteAlbumByID: (db, album, callback) => {
        db.collection("Album").updateOne({ _id: ObjectId(album._id) }, { $set: { delete: true } }, callback);
    },
    get: (db, limit) => {
        limit = parseInt(limit);
        return db.collection("Album").find({ delete: { $ne: true } }).limit(limit).toArray();
    },
    getAlbumSongByID: (db, _id) => {
        console.log(_id)
        return db.collection("Song").find({ "album._id": ObjectId(_id) , delete: { $ne: true } }).toArray();
    },
    getAlbumInfoByID: (db, _id) => {
        return db.collection("Album").findOne({ _id: ObjectId(_id), delete: { $ne: true } });
    },

}



