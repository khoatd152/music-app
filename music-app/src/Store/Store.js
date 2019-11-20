/* eslint-disable no-dupe-keys */
/* eslint-disable eqeqeq */
import { createStore } from 'redux';
import config from '../Common';

const defaultState = {
    user: null,
    listSong: [],
    currentSong: {},
    listArtist: [
    ],
    playlists: [
    ],
    modal: 0,
    searchText: null,
    isPlaying: false,
    openSongPanel: false
};
function todos(state = defaultState, action) {
    switch (action.type) {
        case config.ACTION.REMOVE_ITEM_LIST_SONG: {
            let listSong = state.listSong.filter(p => {
                return !action.listSongRemoved.includes(p._id + "");
            });
            let index = listSong.indexOf(s => s._id == state.currentSong._id);
            console.log(index);
            if (index < 0 && listSong.length) { // if current song is removed from list song
                return {
                    ...state, listSong: listSong, currentSong: listSong[0]
                }
            }
            return {
                ...state, listSong: listSong
            };
        }
        case config.ACTION.UPDATE_CURRENT_SONG: {
            let currentSong;
            if (action.currentSong._id) {
                if (!state.listSong) {
                    state.listSong = [];
                }
                currentSong = state.listSong.find(s => s._id == action.currentSong._id);
                if (!currentSong) {
                    currentSong = action.currentSong;
                    state.listSong.push(action.currentSong);
                }

                // return {
                //     ...state,
                //     currentSong: action.currentSong,
                // };
            }
            else {
                currentSong = state.listSong.find(s => s._id == action.currentSong);
            }
            console.log(currentSong)
            return {
                ...state, currentSong: currentSong, isPlaying: true
            };
        }
        case config.ACTION.LOG_OUT: {
            return {
                ...state, user: null
            };
        }
        case config.ACTION.CHANGE_MODAL: {
            return {
                ...state, modal: action.modal
            };
        }
        case config.ACTION.CHANGE_LIST_SONG: {
            if (action.listSong && action.listSong.length) {
                return {
                    ...state, listSong: action.listSong, currentSong: action.listSong[0]
                }
            }
            else {
                return {
                    ...state, listSong: action.listSong
                }
            }
        }
        case config.ACTION.PLAY_ALL_LIST: {
            state.listSong = action.songs;
            state.currentSong = action.songs[0];
            return {
                ...state
            };
        }
        case config.ACTION.LOG_IN: {
            state.user = action.user;
            state.showLogin = false;
            return {
                ...state
            };
        }
        case config.ACTION.OPEN_LOGIN_MODAL: {
            state.showLogin = action.isShow;
            console.log(state.showLogin)
            return { ...state };
        }
        case config.ACTION.OPEN_MODAL: {
            state.modal = {
                isShow: true,
                song: action.song,
                type: 1
            }
            return { ...state };
        }
        case config.ACTION.CLOSE_MODAL: {
            state.modal = {
                isShow: false
            }
            return { ...state };
        }
        case config.ACTION.SEARCH: {
            state.searchText = action.searchText;
            return { ...state };
        }
        case config.ACTION.IS_PLAYING: {
            state.isPlaying = action.isPlaying;
            return { ...state };
        }
        case config.ACTION.IS_MUTE: {
            state.isMute = action.isMute;
            return { ...state };
        }
        case config.ACTION.OPEN_SONG_PANEL: {
            
            state.openSongPanel = action.openSongPanel;
            return { ...state };
        }
        default:
            return state;
    }
}

const store = createStore(todos);

export default store;