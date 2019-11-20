const Artist = require('../Model/ArtistModel');

module.exports = {
    get: (req, res) => {
        Artist.getAllArtist(req.app.locals.db).then((Artists) => {
            res.json(Artists);
        });
    },
    getArtistByID: (req, res) => {
        Artist.getArtistByID(req.app.locals.db, req.params.id).then(Artists => {
            res.json(Artists);
        });
    },
    update: (req, res) => {
        Artist.updateArtistByID(req.app.locals.db, req.body, (err, result) => {
            if (err)
                console.log(err);
            res.json(result);
        });
    },
    delete: (req, res) => {
        Artist.deleteArtistByID(req.app.locals.db, req.body, (err, result) => {
            if (err)
                console.log(err);
            res.json(result);
        });
    },
    getLimit: (req, res) => {
        Artist.getLimit(req.app.locals.db, req.params.limit).then(artists => {
            res.json(artists);
        })
    }
}