/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import ListSong from '../../ListSongComponent/ListSongComponent';
import './PlaylistDetailPage.css';
import config from '../../../Common';
import { connect } from 'react-redux';


class PlaylistDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: "",
            info: ""
        };

    }

    async componentDidMount() {
        let params = this.props.match.params;
        console.log(params);
        if (params.albumID) {
            let [info, data] = await Promise.all([
                fetch(config.API_SERVER + 'album/info/' + params.albumID).then(res => res.json()),
                fetch(config.API_SERVER + 'album/song/' + params.albumID).then(res => res.json())
            ]);
            this.setState({
                list: data,
                info: info
            })
        }
        else if (params.playlistID) {
            let [info, songs] = await Promise.all([
                fetch(config.API_SERVER + 'playlist/info/' + params.playlistID).then(res => res.json()),
                fetch(config.API_SERVER + 'playlist/song/' + params.playlistID).then(res => res.json())
            ])
            
            this.setState({
                list: songs,
                info: info
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="PlaylistDetail row">
                    <div className="playlistInfo col-3">
                        <img className="img-fluid" src={this.state.info.img ? this.state.info.img : config.defaultImg} />
                        <div className="infoDetails col-12">
                            <h3 className="title">{this.state.info.name}</h3>
                            <a onClick={() => config.PlayAll(this.state.list, this.props.dispatch)} className="btn">
                                <i className="fas fa-play"></i> Phát tất cả</a>
                            <div className="songCount">{this.state.list.length} bài hát</div>
                        </div>
                    </div>
                    <div className="playlist col-9">
                        <ListSong list={this.state.list} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect()(PlaylistDetailPage);