/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MyMusic.css';
import { Redirect, NavLink, Route, Switch } from 'react-router-dom';
import ListSong from '../../ListSongComponent/ListSongComponent';
import ListCard from '../../CardComponent/CardComponent';
import ChildMenu from '../../ChildMenuComponent/ChildMenuComponent';
import config from '../../../Common';

class MyMusic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playlists: []
        }
    }

    async componentDidMount() {
        if (this.props.user) {
            let [playlists] = await Promise.all([
                fetch(config.API_SERVER + 'playlist/' + this.props.user._id).then(res => res.json())
            ]);
            console.log(this.props.user._id)
            this.setState({
                playlists: playlists
            })
        }

    }

    render() {
        let menus = [
            {
                name: "Bài hát",
                url: "/canhan/baihat",
                list: this.props.listFavorite
            },
            {
                name: "Playlist",
                url: "/canhan/playlist",
                list: this.state.playlists
            },
        ];
        return (
            <React.Fragment>
                <div className="mymusicBody row">
                    <div className=" col-3">
                        <ChildMenu
                            menus={menus}
                        />
                    </div>
                    <div className="col-9 body ">
                        <Switch>
                            <Route path="/canhan/baihat">
                                <div className="title row ">
                                    <div className="titleSlider col-8">
                                        Bài hát
                                    </div>
                                    <div className="col-4">
                                        <a className="btn float-right "><i className="fas fa-play"></i> Nghe tất cả</a>
                                    </div>
                                </div>
                                <ListSong list={this.props.listFavorite}></ListSong>
                            </Route >
                            <Route path="/canhan/playlist">
                                <div className="title row">
                                    <div className="titleSlider col-8">
                                        Playlist
                                    </div>
                                    <div className="col-4">
                                        <a className="btn float-right "><i className="fas fa-plus" aria-hidden="true"></i> Thêm playlist</a>
                                    </div>
                                </div>
                                <div className="row">
                                    <ListCard
                                        isPlaylist={true}
                                        list={this.state.playlists} />
                                </div>
                            </Route>
                            <Redirect to="/canhan/baihat" />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(MyMusic);