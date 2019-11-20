const ObjectId = require('mongodb').ObjectID;
module.exports = {
    getAllPlaylist: (db) => {
        return db.collection("Playlist").find({ delete: { $ne: true } }).toArray();
    },
    getPlaylistByUser: (db, _id) => {
        return db.collection("Playlist").find({ user: ObjectId(_id), delete: { $ne: true } }).toArray();
    },
    insertSongIntoPlaylist: (db, isFav, obj, callback) => {
        console.log(obj)
        let songs = obj.songs.map(song => new ObjectId(song));
        if (obj._id) {
            db.collection("Playlist").updateOne({ _id: ObjectId(obj._id) }, { $addToSet: { songs: { $each: songs } } }, callback);
        }
        else {
            if (isFav == 1) {
                db.collection("Playlist").insertOne({ user: ObjectId(obj.userID), name: obj.name, isFav: true, songs: songs }, callback);
            }
            else {
                db.collection("Playlist").insertOne({ user: ObjectId(obj.userID), name: obj.name, songs: songs }, callback);
            }
        }
    },
    deletePlaylistByID: (db, Playlist, callback) => {
        db.collection("Playlist").updateOne({ _id: ObjectId(Playlist._id) }, { $set: { delete: true } }, callback);
    },
    getPlaylistSongByID: (db, id) => {
        return module.exports.getPlaylistInfoByID(db, id).then(playlist => {
            return db.collection("Song").find({ _id: { $in: playlist.songs } }).toArray();
        })
    },
    removePlaylistSongByID: (db, obj) => {
        console.log(obj);
        let removeArr = obj.songs.map(song => new ObjectId(song));
        return db.collection("Playlist").updateOne({ _id: ObjectId(obj._id) }, { $pull: { songs: { $in: removeArr } } });
    },
    getPlaylistInfoByID: (db, _id) => {
        return db.collection("Playlist").findOne({ _id: ObjectId(_id) });
    },
    getFavoriteSongsByUser: (db, _id) => {
        return db.collection("Playlist").findOne({ user: ObjectId(_id), isFav: true });
    },
}



