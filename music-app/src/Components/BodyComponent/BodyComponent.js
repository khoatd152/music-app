/* eslint-disable no-useless-constructor */
/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from "react-router-dom";
import Index from '../Page/IndexComponent/IndexComponent';
import Chart from '../Page/ChartPageComponent/ChartPageComponent';
import Album from '../Page/AlbumPageComponent/AlbumPageComponent';
import Artist from '../Page/ArtistComponent/ArtistComponent';
import MyMusic from '../Page/MyMusicComponent/MyMusicComponent';
import PlaylistDetail from '../Page/PlaylistDetailPageComponent/PlaylistDetailPageComponent';
import SongDetail from '../Page/SongDetailPageComponent/SongDetailPageComponent';
import SearchPage from '../Page/SearchPageComponent/SearchPageComponent';

import { createBrowserHistory } from 'history';
export const browserHistory = createBrowserHistory();

class Body extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container" id="musicAppBody" style={{ height: "2000px" }}>
                <Switch>

                    <Route path="/trangchu" exact >
                        <Index />
                    </Route>
                    <Route path="/bxh" component={Chart} />
                    <Route path="/album/:albumID" component={PlaylistDetail} />
                    <Route path="/album" component={Album} />
                    <Route path="/baihat/:id" component={SongDetail} />
                    <Route path="/nghesi">
                        <Artist />
                    </Route>
                    <Route path="/canhan/playlist/:playlistID" component={PlaylistDetail} />
                    <Route path="/canhan" component={MyMusic} />
                    <Route path="/timkiem/:type/:searchText" component={SearchPage} />

                    <Route path="/playlist/nhac">
                        <PlaylistDetail list={this.props.listRank} />
                    </Route>
                    <Redirect from="/" exact to="/trangchu" />

                </Switch>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(Body);