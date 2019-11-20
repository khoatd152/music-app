import services from './Services/Services';


let commonObj = {
    API_SERVER: "https://music-server1920.herokuapp.com/api/",
    ACTION: {
        REMOVE_ITEM_LIST_SONG: 'REMOVE_ITEM_LIST_SONG',
        UPDATE_CURRENT_SONG: 'UPDATE_CURRENT_SONG',
        LOG_OUT: 'LOG_OUT',
        CHANGE_MODAL: 'CHANGE_MODAL',
        CHANGE_LIST_SONG: 'CHANGE_LIST_SONG',
        PLAY_ALL_LIST: 'PLAY_ALL_LIST',
        LOG_IN: 'LOG_IN',
        OPEN_MODAL: 'OPEN_MODAL',
        OPEN_LOGIN_MODAL: 'OPEN_LOGIN_MODAL',
        CLOSE_MODAL: 'CLOSE_MODAL',
        SEARCH: 'SEARCH',
        IS_PLAYING: 'IS_PLAYING',
        IS_MUTE: 'IS_MUTE',
        OPEN_SONG_PANEL: 'OPEN_SONG_PANEL'
    },
    defaultImg: "https://photo-zmp3.zadn.vn/album_default.png",
    ChangeSong: (song, dispatch) => {
        dispatch({
            type: commonObj.ACTION.UPDATE_CURRENT_SONG,
            currentSong: song
        });
    },
    PlayAll: (songs, dispatch) => {
        dispatch({
            type: commonObj.ACTION.PLAY_ALL_LIST,
            songs: songs
        });
    },
    ShowLoginModal: (isShow, dispatch) => {
        dispatch({
            type: commonObj.ACTION.OPEN_LOGIN_MODAL,
            isShow: isShow
        })
    },
    OpenAddPlaylistModal: (song, dispatch) => {
        dispatch({
            type: commonObj.ACTION.OPEN_MODAL,
            song: song
        });
    },
    AddNewPlaylist: (userID, name, callback) => {
        services.addSongIntoPlaylist(null, userID, null, name).then(res => {
            callback(res);
        });
    },
    AddSongIntoPlaylist: (playlist, user, song, callback) => {
        if (playlist.songs.includes(song._id)) {
            services.removeSongInPlaylist(playlist._id, [song]).then(res => {
                callback(res);
            });
        }
        else {
            services.addSongIntoPlaylist(playlist._id, user._id, [song], null).then(res => {
                callback(res);
            });
        }
    },
    setPlayingStatus: (isPlaying, dispatch) => {
        dispatch({
            type: commonObj.ACTION.IS_PLAYING,
            isPlaying: isPlaying
        })
    }
}

export default commonObj;