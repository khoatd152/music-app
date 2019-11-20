const Song = require('../Model/SongModel');

module.exports = {
    get: (req, res) => {
        Song.getAllSong(req.app.locals.db).then((songs) => {
            res.json(songs);
        });
    },
    getSongByID: (req, res) => {
        Song.getSongByID(req.app.locals.db, req.params.id).then(songs => {
            res.json(songs);
        });
    },
    update: (req, res) => {
        Song.updateSongByID(req.app.locals.db, req.body, (err, result) => {
            if (err)
                console.log(err);
            res.json(result);
        });
    },
    delete: (req, res) => {
        Song.deleteSongByID(req.app.locals.db, req.body, (err, result) => {
            if (err)
                console.log(err);
            res.json(result);
        });
    },
    getNewSong: (req, res) => {
        Song.getNewSong(req.app.locals.db, req.params.limit).then(songs => {
            res.json(songs);
        })
    },
    upViews: (req, res) => {
        Song.upViews(req.app.locals.db, req.params.id, (err, result) => {
            let response = {
                success: true,
                err: null
            };
            if (!(result && result.result && result.result.ok)) {
                if (err) {
                    response = {
                        success: false,
                        err: err
                    }
                }
                else {
                    response = {
                        success: false,
                        err: "_id not found"
                    }
                }
            }
            res.json(response);
        })
    },
    upLikes: (req, res) => {
        Song.upLikes(req.app.locals.db, req.params.id, req.params.isUp, (err, result) => {
            let response = {
                success: true,
                err: null
            };
            if (!(result && result.result && result.result.ok)) {
                if (err) {
                    response = {
                        success: false,
                        err: err
                    }
                }
                else {
                    response = {
                        success: false,
                        err: "_id not found"
                    }
                }
            }
            res.json(response);
        })
    },
    getRandomWithoutID: (req, res) => {
        Song.getRandomWithoutID(req.app.locals.db, req.params.id).then(data => {
            res.json(data);
        })
    },
    searchSong: (req, res) => {
        Song.searchSong(req.app.locals.db, req.body.searchText)
            .then(data => {
                res.json(data);
            })
    },
    addSearhText: (req, res)=>{
        Song.addSearhText(req.app.locals.db)
            .then(data => {
                res.json(data);
            })
    }
}