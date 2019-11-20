/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AritstComponent from '../ArtistComponent/ArtistComponent';

class SongInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    changeTimeSong = (e) => {
        document.getElementById('musicplayer').currentTime = parseInt(e.target.value);
    }

    render() {
        return (
            <div className="col-lg-5 col-9 info row">
                <Link to="/baihat/" className="songImg"
                    style={{
                        backgroundImage: 'url("' + this.props.currentSong.img + '")',
                    }} > </Link>
                <div className="row name d-flex">
                    <Link to={"/baihat/" + this.props.currentSong._id} className="songName textOverflow">
                        {this.props.currentSong.name} </Link> <span className="d-none  d-lg-block">-</span>
                    <AritstComponent artists={this.props.currentSong.artists} />
                    <div className="songTime ml-auto">
                        <span id="currentSongTime" className="current">00:00</span>
                        <span className="total">/</span>
                        <span id="durationSongTime" className="total">  04:00</span>
                    </div>
                    <div className="slideBar">
                        <input type="range"
                            defaultValue={0}
                            className="slider"
                            id="songSlider"
                            onChange={this.changeTimeSong}
                        />
                    </div>
                </div>
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
export default connect(mapStateToProps)(SongInfo);