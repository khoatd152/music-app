/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import config from '../../Common';

class PlayerControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false
        }
    }

    ShowLoading = () => {
        return (
            <Spinner animation="border" variant="light" />
        );
    }

    ShowPlayButton = () => {
        var isPlaying = this.props.isPlaying;
        return (
            <React.Fragment>
                <a style={{ display: !isPlaying ? "block" : "none" }} onClick={this.playAudio}><i className="fas fa-play" ></i></a>
                <a style={{ display: isPlaying ? "block" : "none" }} onClick={this.playAudio}><i className="fas fa-pause" ></i></a>
            </React.Fragment>
        );
    }

    playAudio = () => {
        let isPlaying = false;
        if (!this.props.isPlaying) {
            document.getElementById('musicplayer').play();
            isPlaying = true
        }
        else {
            document.getElementById('musicplayer').pause();
        }
        config.setPlayingStatus(isPlaying, this.props.dispatch);
    }

    playPreviousSong = () => {
        let index = this.props.listSong.findIndex(s => s._id === this.props.currentSong._id);
        if (index === 0) {
            index = this.props.listSong.length - 1;
        }
        else {
            index--;
        }
        config.ChangeSong(this.props.listSong[index], this.props.dispatch);
    }

    playNextSong = () => {
        let index = this.props.listSong.findIndex(s => s._id === this.props.currentSong._id);
        if (index === this.props.listSong.length - 1) {
            index = 0;
        }
        else {
            index++;
        }
        config.ChangeSong(this.props.listSong[index], this.props.dispatch);
    }


    render() {
        return (
            <div className="col-lg-3 col-3 control">
                <a onClick={this.playPreviousSong}><i className="fas fa-step-backward "></i></a>
                {this.props.isLoading ? this.ShowLoading() : this.ShowPlayButton()}
                <a onClick={this.playNextSong}><i className="fas fa-step-forward"></i></a>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSong: state.currentSong,
        listSong: state.listSong,
        isPlaying: state.isPlaying
    };
}
export default connect(mapStateToProps)(PlayerControl);