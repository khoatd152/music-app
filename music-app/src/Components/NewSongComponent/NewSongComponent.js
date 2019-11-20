/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './NewSong.css';
import ArtistComponent from '../ArtistComponent/ArtistComponent';
import { connect } from 'react-redux';
import config from '../../Common';
import ListSong from '../ListSongComponent/ListSongComponent';

class NewSong extends Component {

    ShowBody = () => {
        var indexToSplit = this.props.list.length / 2;
        var first = this.props.list.slice(0, indexToSplit);
        var second = this.props.list.slice(indexToSplit);
        return (
            <React.Fragment>
                {/* <div className="newSongBody col-12"> */}
                <div className=" col-12  col-lg-6">
                    {/* {this.ShowNewSong(first)} */}
                    <ListSong list={first} hideControl={true} />
                </div>
                <div className=" col-12  col-lg-6">
                    {/* {this.ShowNewSong(second)} */}
                    <ListSong list={second} hideControl={true} />
                </div>
                {/* </div> */}
            </React.Fragment>

        );
    }

    ShowNewSong = (list) => {
        if (list && list.length) {
            return list.map((element, index) => {
                return (
                    <div onClick={() => config.ChangeSong(element, this.props.dispatch)}
                        className="infoSongInRank textChart row col-12"
                        key={index}
                    >
                        <div>
                            <img className="chartImg" src={element.img} />
                        </div>
                        <div className="songInChart col-8" >
                            <a onClick={() => config.ChangeSong(element, this.props.dispatch)}
                                className=" col-12 overflowText">{element.name}</a>
                            <div data-role="artists" className="row col-12">
                                <ArtistComponent artists={element.artists} cls={" overflowText"} />
                            </div>
                        </div>
                    </div>
                );
            });
        }
        return <React.Fragment />
    }



    render() {
        return (
            <React.Fragment>
                {/* <div className="NewSong col-12 row">
                    <div className="headerNewSong row col-12">
                        <div className="titlePart col-8">
                            Bài hát mới
                        </div>
                        <div className="col-4">
                            <a onClick={() => config.PlayAll(this.props.list, this.props.dispatch)} className="float-right playAllNewSong"><i className="fas fa-play"></i> Nghe tất cả</a>
                        </div>
                    </div>
                    {this.ShowBody()}
                </div> */}
                <div className="row">
                    <div className="titleSlider col-12">{this.props.title}</div>
                    <this.ShowBody></this.ShowBody>
                </div>
            </React.Fragment>
        );
    }
}



export default connect()(NewSong);