const Playlist = require('../Model/PlaylistModel');

module.exports = {
    get: (req, res) => {
        Playlist.getAllPlaylist(req.app.locals.db).then((Playlists) => {
            res.json(Playlists);
        });
    },
    insert: (req, res) => {
        Playlist.insertSongIntoPlaylist(req.app.locals.db, req.params.type, req.body, (err, result) => {
            if (err)
                console.log(err);   
            res.json(result);
        });
    },
    delete: (req, res) => {
        Playlist.deletePlaylistByID(req.app.locals.db, req.body, (err, result) => {
            if (err)
                console.log(err);
            res.json(result);
        });
    },
    getPlaylistByUser: (req, res) => {
        Playlist.getPlaylistByUser(req.app.locals.db, req.params.user).then(Playlists => {
            res.json(Playlists);
        });
    },
    getPlaylistSongByID: (req, res) => {
        Playlist.getPlaylistSongByID(req.app.locals.db, req.params.id).then(results => {
            res.json(results);
        });
    },
    removePlaylistSongByID: (req, res) => {
        Playlist.removePlaylistSongByID(req.app.locals.db, req.body).then(result => {
            res.json(result);
        });
    },
    getPlaylistInfoByID: (req, res) => {
        Playlist.getPlaylistInfoByID(req.app.locals.db, req.params.id)
            .then(result => res.json(result));
    },
    getFavoriteSongByUser: (req, res) => {
        Playlist.getFavoriteSongsByUser(req.app.locals.db, req.params.user)
            .then(result => res.json(result));
    }
}