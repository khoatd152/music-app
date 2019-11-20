const Album = require('../Model/AlbumModel');

module.exports = {
    get: (req, res) => {
        Album.getAllAlbum(req.app.locals.db).then((albums) => {
            res.json(albums);
        });
    },
    update: (req, res) => {
        Album.updateAlbumByID(req.app.locals.db, req.body, (err, result) => {
            if (err)
                console.log(err);
            res.json(result);
        });
    },
    delete: (req, res) => {
        Album.deleteAlbumByID(req.app.locals.db, req.body, (err, result) => {
            if (err)
                console.log(err);
            res.json(result);
        });
    },
    getLimit: (req, res) => {
        Album.get(req.app.locals.db, req.params.limit).then((albums) => {
            res.json(albums);
        });
    },
    getAlbumSongByID: (req, res) => {
        Album.getAlbumSongByID(req.app.locals.db, req.params.id).then(results => {
            res.json(results);
        })
    },
    getAlbumInfoByID: (req, res) => {
        Album.getAlbumInfoByID(req.app.locals.db, req.params.id).then(info => {
            res.json(info);
        })
    }
}