const router = require('express').Router();
const songController = require('../Controller/SongController');
const albumController = require('../Controller/AlbumController');
const chartController = require('../Controller/ChartController');
const artistController = require('../Controller/ArtistController');
const playlistController = require('../Controller/PlaylistController');
const userController = require('../Controller/UserController.js');

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

//Song
router.route('/song')
    .get(songController.get)
    .post(songController.update)
    .delete(songController.delete);

router.route('/song/:id').get(songController.getSongByID);
router.route('/newsong/:limit').get(songController.getNewSong);
router.route('/view/song/:id').get(songController.upViews);
router.route('/like/song/:id/:isUp').get(songController.upLikes);
router.route('/song/recommend/:id').get(songController.getRandomWithoutID);

//Album
router.route('/album')
    .get(albumController.get)
    .post(albumController.update)
    .delete(albumController.delete);
router.route('/album/:limit').get(albumController.getLimit);
router.route('/album/song/:id').get(albumController.getAlbumSongByID);
router.route('/album/info/:id').get(albumController.getAlbumInfoByID);

//Chart 
router.route('/chart')
    .get(chartController.get)
    .post(chartController.insert);

router.route('/chart/:type/:limit')
    .get(chartController.getChartByType);

//Artist
router.route('/artist')
    .get(artistController.get)
    .post(artistController.update)
    .delete(artistController.delete);
router.route('/artist/:limit').get(artistController.getLimit);

//Playlist
router.route('/playlist')
    .get(playlistController.get)
    .delete(playlistController.removePlaylistSongByID);
router.route('/playlist/:user')
    .get(playlistController.getPlaylistByUser);
router.route('/playlist/info/:id')
    .get(playlistController.getPlaylistInfoByID);
router.route('/playlist/song/:id')
    .get(playlistController.getPlaylistSongByID)
router.route('/playlist/type/:type') //type 0: normal playlist, 1: favorite songs
    .post(playlistController.insert);
router.route('/playlist/favorite/:user')
    .get(playlistController.getFavoriteSongByUser);

//User
router.route('/user')
    .get(userController.get)
    .post(userController.update)
    .delete(userController.delete);
router.route('/user/:user')
    .get(userController.getUser);
router.route('/login')
    .post(userController.login);

//search 
router.route('/search')
    .post(songController.searchSong);

router.route('/abc').get(songController.addSearhText);

// Export API routes
module.exports = router;