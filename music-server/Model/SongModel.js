const ObjectId = require('mongodb').ObjectID;
const common = require('../Common/Common');
module.exports = {
    getAllSong: (db) => {
        return db.collection("Song").find({ delete: { $ne: true } }).toArray();
    },
    getSongByID: (db, id) => {
        return db.collection("Song").find({ _id: ObjectId(id), delete: { $ne: true } }).toArray();
    },
    updateSongByID: (db, song, callback) => {
        if (song._id) { //existing 
            let _id = song._id;
            delete song._id;
            db.collection("Song").updateOne({ _id: ObjectId(_id) }, { $set: song }, callback);
        }
        else {
            song.created = new Date();
            db.collection("Song").insert(song, callback);
        }
    },
    deleteSongByID: (db, song, callback) => {
        db.collection("Song").updateOne({ _id: ObjectId(song._id) }, { $set: { delete: true } }, callback);
    },
    getNewSong: (db, limit) => {
        limit = parseInt(limit);
        return db.collection("Song").find({ delete: { $ne: true } }).sort({ created: -1 }).limit(limit).toArray();
    },
    upViews: (db, _id, callback) => {
        db.collection("Song").findOne({ _id: ObjectId(_id), delete: { $ne: true } }).then(song => {
            if (song) {
                song.views++;
                song.weekviews++;
                song.monthviews++;
                module.exports.updateSongByID(db, song, callback);
            }
            else {
                callback(null);
            }
        });
    },
    getRandomWithoutID: (db, _id) => {
        return db.collection("Song").aggregate([
            { $sample: { size: 5 } },
            { $match: { _id: { $ne: ObjectId(_id) }, delete: { $ne: true } } }
        ]).toArray();
    },
    upLikes: (db, _id, isUp, callback) => {
        return db.collection("Song").findOne({ _id: ObjectId(_id), delete: { $ne: true } }).then(song => {
            if (song) {
                if (!song.likes) {
                    song.likes = 1;
                }
                if (isUp == 1)
                    song.likes++;
                else
                    song.likes--;
                module.exports.updateSongByID(db, song, callback);
            }
            else {
                callback(null);
            }
        });
    },
    searchSong: async (db, text) => {
        let result = {
            songs: [],
            artists: [],
            albums: []
        };
        let searchText = new RegExp(text, 'i');
        result.songs = await db.collection("Song")
            .find({ searchText: searchText }).toArray().then(res => res);
        result.songs.forEach(song => {
            if (song.artists) {
                song.artists.forEach(artists => {
                    if (result.artists.findIndex(a => a._id.equals(artists._id)) == -1) {
                        result.artists.push(artists);
                    }
                });
            }
            if (song.album &&
                (result.albums.findIndex(a =>  a._id.equals(song.album._id) ) == -1)) {
                result.albums.push(song.album);
            }

        });

        return result;
    },
    addSearhText: (db) => {
        // return db.collection("Song").find().forEach(element => {
        //     let albumTxt = "";
        //     let artistText = element.artists.map((e, i) => {
        //         return e.name;
        //     }).join(' ');
        //     if (element.album) {
        //         db.collection("Album").find({ _id: ObjectId(element.album) }).forEach(album => {
        //             albumTxt = album.name;
        //             let searchText = common.convertLatin(
        //                 element.name + ' ' +
        //                 common.removeTag(element.lyrics) +
        //                 artistText + ' ' +
        //                 albumTxt
        //             );
        //             console.log(searchText)
        //             db.collection("Song").updateOne({ _id: ObjectId(element._id) },
        //                 { $set: { searchText: searchText } });
        //         });
        //     }
        //     else {
        //         let searchText = common.convertLatin(
        //             element.name + ' ' +
        //             common.removeTag(element.lyrics) + ' ' +
        //             artistText + ' ' +
        //             albumTxt
        //         );
        //         console.log(searchText)
        //         db.collection("Song").updateOne({ _id: ObjectId(element._id) },
        //             { $set: { searchText: searchText } });

        //     }
        // });
        // return db.collection("Song").find().forEach(song => {
        //     db.collection("Album").findOne({ _id: ObjectId(song.album) })
        //         .then(album => {
        //             db.collection("Song").updateOne({ _id: ObjectId(song._id) }, {
        //                 $set: {
        //                     album: album
        //                 }
        //             })
        //         })
        // })
    }
}



