/* eslint-disable no-sequences */
import config from '../Common';

let obj = {
    addSongIntoPlaylist: async (playlistID, userID, songs, name) => {
        if (!songs) {
            songs = [];
        }
        else {
            songs = songs.map((element, index) => element._id);
        }
        return await fetch(config.API_SERVER + 'playlist/type/0', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userID: userID,
                songs: songs,
                name: name,
                _id: playlistID
            })
        })
            .then(res => res.json())
            .then(result => result);
    },
    removeSongInPlaylist: async (playlistID, songs) => {
        if (songs) {
            songs = songs.map((element, index) => element._id);
        }
        return await fetch(config.API_SERVER + 'playlist', {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                songs: songs,
                _id: playlistID
            })
        })
            .then(res => res.json())
            .then(result => result);
    },
    search: (searchText) => {
        if (searchText) {
            return fetch(config.API_SERVER + 'search', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    searchText: searchText
                })
            }).then(res => { return res.json() }).then(res => { return res });
        }
        return null;
    }
}

export default obj;