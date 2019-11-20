/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import '../Page/ChartPageComponent/ChartPage.css';
import Artist from '../ArtistComponent/ArtistComponent';
import config from '../../Common';
import { connect } from 'react-redux';
import './ListSong.css';

class ListSong extends Component {

    ShowInfoSong = (element, size = "col-12") => {
        return (
            <div
                className={"infoSongInRank textChart row " + size}>
                <div>
                    <img className="chartImg" src={element.img ? element.img : config.defaultImg} />
                </div>
                <div className="songInChart col-9 songInfoInListSong">
                    <a
                        onClick={() => config.ChangeSong(element, this.props.dispatch)}
                        className=" textOverflow">{element.name}</a>
                    <div data-role="artists" className=" row">
                        <Artist artists={element.artists} cls="overflowText" />
                    </div>
                </div>
            </div>
        );
    }

    ShowControl = (element) => {
        return (
            <div className="itemControls col-3 ">
                <ul className="row  float-right">
                    <li><a><i className="fas fa-info-circle"></i></a></li>
                    <li><a onClick={() => config.OpenAddPlaylistModal(element, this.props.dispatch)}>
                        <i className="fas fa-plus"></i></a></li>
                    <li><a><i className="fas fa-download"></i></a></li>
                </ul>
            </div>
        );
    }

    ShowListSong = () => {
        if (!this.props.list) return null;
        return this.props.list.map((element, index) => {
            return (
                <div className="row col-12 item nonePadding" key={index}>
                    {this.ShowInfoSong(element, "col-8")}
                    {this.props.hideControl ? "" : this.ShowControl(element)}
                </div>
            );
        });
    }

    render() {
        return (
            <this.ShowListSong />
        );
    }
}

export default connect()(ListSong);