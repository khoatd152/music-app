/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from '../../Common';


class MoreControl extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    muteVolume = () => {
        let audio = document.getElementById('musicplayer');
        let volume = audio.volume;
        //alert(volume);
        if (volume)
            audio.volume = 0;
        else
            audio.volume = 1;
        this.props.dispatch({
            type: config.ACTION.IS_MUTE,
            isMute: volume ? true : false
        });
    }

    openSongPanel = () => {
        this.props.dispatch({
            type: config.ACTION.OPEN_SONG_PANEL,
            openSongPanel: true
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-lg-1 action d-none  d-lg-block moreControlPlayer">
                    <a
                        onClick={this.muteVolume}
                        style={{ display: this.props.isMute ? "none" : "initial" }}
                    ><i className="fas fa-volume-up volume" ></i></a>
                    <a
                        onClick={this.muteVolume}
                        style={{ display: this.props.isMute ? "initial" : "none" }}
                    ><i className="fas fa-volume-mute"></i></a>
                    <input className="volumeSlider"
                        step="1"
                        type="range"
                        min={0} max={10} defaultValue={10}
                        onChange={this.changeVolume}
                    />
                    <a><i className="fas fa-heart"></i></a>
                    <a download href={this.props.currentSong.link}>
                        <i className="fas fa-download"></i></a>
                </div>
                <div className="songList action d-none  d-lg-block">
                    <a onClick={this.openSongPanel} >
                        <i className="fas fa-list-alt"></i>
                        <span className="title"> Danh sách bài hát({this.props.listSong.length}) </span>
                    </a>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSong: state.currentSong,
        isMute: state.isMute,
        listSong: state.listSong
    };
}
export default connect(mapStateToProps)(MoreControl);