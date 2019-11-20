/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MiniPlayer.css';
import './MiniPlayer';

import config from '../../Common';
import PlayerControl from './PlayerControlComponent';
import SongInfo from './SongInfoComponent';
import MoreControl from './MoreControlComponent';
import SongPanel from './SongPanelComponent';

class MiniPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkedListSong: [],
            openListSong: false,
            isSearching: false,
            textSearch: "",
            playRandom: false,
            isRepeat: false,
            startTime: null,
            isLoading: true
        }
    }


    changeAudio = (e) => {
        this.setState({
            isLoading: true
        });
        document.getElementById('currentSongTime').innerHTML = '00:00';
        document.getElementById('durationSongTime').innerHTML = '00:00';
        let slider = document.getElementById('songSlider');
        slider.value = 0;
    }

    prepareAudio = (e) => {
        let audio = e.target;
        let durationTime = parseInt(audio.duration);
        let slider = document.getElementById('songSlider');
        slider.max = durationTime;
        slider.min = 0;
        let durationTimeElement = document.getElementById('durationSongTime');
        durationTimeElement.textContent = this.convertTimer(durationTime);
        audio.play();
        this.setState({
            isLoading: false
        }, () => {
            config.setPlayingStatus(true, this.props.dispatch);
        });
    }

    //convert timer song
    convertTimer(time) {
        let remainder = parseInt(time % 60) + '';
        let quotient = parseInt(time / 60) + '';
        if (remainder.length === 1)
            remainder = '0' + remainder;
        if (quotient.length === 1)
            quotient = '0' + quotient;
        return quotient + ":" + remainder;
    }

    pauseAudio = (e) => {
        let audio = e.target;
        this.setState({
            startTime: this.state.startTime ? this.state.startTime : new Date()
        }, () => {
            console.log(this.state.startTime);
            config.setPlayingStatus(audio.paused ? false : true, this.props.dispatch);
        });
    }

    updateSongSlider = (e) => {
        let slider = document.getElementById('songSlider');
        slider.value = e.target.currentTime;

        //
        document.getElementById('currentSongTime').innerHTML = this.convertTimer(slider.value);

        //set color for slider
        var val = (slider.value - slider.min) / (slider.max - slider.min);
        slider.style.backgroundImage = '-webkit-gradient(linear, left top, right top, '
            + 'color-stop(' + val + ', #815fdd), '
            + 'color-stop(' + val + ', white)';
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

    endAudio = (e) => {
        if (this.props.listSong.length > 1) {
            this.playNextSong();
        }
        else {
            document.getElementById('musicplayer').play();
        }
    }


    changeSong = (index) => {
        this.props.dispatch({
            type: "UPDATE_CURRENT_SONG",
            currentSong: this.props.listSong[index]._id
        });
    }

    shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    playRandomListSong = () => {
        console.log(this.props.listSong);
        let playRandom = this.state.playRandom;
        let listSong = this.props.listSong;
        if (!playRandom) {
            listSong = this.shuffle(this.props.listSong);
        }
        this.setState({
            listSong: listSong,
            playRandom: !this.state.playRandom
        });
    }


    checkRepeat = () => {
        this.setState({
            repeat: !this.state.repeat
        });
    }

    changeVolume = (e) => {
        console.log(e.target.value / 10);
        let audio = document.getElementById('musicplayer');
        audio.volume = e.target.value / 10;
    }



    componentDidMount(prevProps, prevState) {
        //alert(123)
    }
    componentDidUpdate() {
    }
    render() {
        if (this.props.currentSong && this.props.listSong.length > 0) {
            return (
                <div id="miniplayer" className="row col-12">
                    <PlayerControl isLoading={this.state.isLoading} />
                    <SongInfo />
                    <MoreControl />
                    <SongPanel />

                    <audio className="hide"
                        id="musicplayer"
                        onLoadedMetadata={this.prepareAudio}
                        src={this.props.currentSong.link}
                        onEnded={this.endAudio}
                        onTimeUpdate={this.updateSongSlider}
                        onLoadStart={this.changeAudio}
                        onPlay={this.pauseAudio}
                        onPause={this.pauseAudio}
                    ></audio>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }

    }
}
function mapStateToProps(state) {
    return {
        currentSong: state.currentSong,
        listSong: state.listSong,
        isPlaying: state.isPlaying
    };
}
export default connect(mapStateToProps)(MiniPlayer);