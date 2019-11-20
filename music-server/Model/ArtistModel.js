const ObjectId = require('mongodb').ObjectID;
module.exports = {
    getAllArtist: (db) => {
        return db.collection("Artist").find({ delete: { $ne: true } }).toArray();
    },
    getArtistByID: (db, id) => {
        return db.collection("Artist").find({ _id: ObjectId(id), delete: { $ne: true } }).toArray();
    },
    updateArtistByID: (db, Artist, callback) => {
        if (Artist._id) { //existing 
            let _id = Artist._id;
            delete Artist._id;
            db.collection("Artist").updateOne({ _id: ObjectId(_id) }, { $set: Artist }, callback);
        }
        else {
            db.collection("Artist").insert(Artist, callback);
        }
    },
    deleteArtistByID: (db, Artist, callback) => {
        db.collection("Artist").updateOne({ _id: ObjectId(Artist._id) }, { $set: { delete: true } }, callback);
    },
    getLimit: (db, limit) => {
        limit = parseInt(limit);
        //return db.collection("Artist").find(query).limit(limit).skip(r).toArray();
        return db.collection("Artist").aggregate([
            { $sample: { size: limit } },
            { $match: { delete: { $ne: true } } }
        ]).toArray();
    }
}



