import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChildMenu from '../../ChildMenuComponent/ChildMenuComponent';
import './SearchPage.css';
import { Switch, Route } from 'react-router-dom';
import CardSlider from '../../CardSliderCompenent/CardSliderComponent';
import CircleCard from '../../CircleCardComponent/CircleCardComponent';
import ListSong from '../../ListSongComponent/ListSongComponent';
import Services from '../../../Services/Services';

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalLength: 0,
            listSong: null,
            listAlbum: null,
            listArtist: null,
        };

    }

    ShowTitleResult = () => {
        return (
            <div className="col-12 titleResult">
                <h3>Kết Quả Tìm Kiếm Cho Từ Khóa "{this.props.searchText}"</h3>
                <h4>Có {this.state.totalLength} kết quả được tìm thấy</h4>
            </div>

        );
    }

    ShowAll = () => {
        return (
            <div className="allSearchResult">
                <div className="carousel slide cardSlider">
                    <div className="titleSlider">Bài hát</div>
                    <ListSong list={this.state.listSong} />
                </div>
                <CircleCard list={this.state.listArtist} title="Nghệ sĩ" />
                <CardSlider list={this.state.listAlbum} title="Album" />
            </div>
        );
    }

    ShowSong = () => {
        return (
            <div className="songResult">
                <div className="carousel slide cardSlider">
                    <h3>Bài hát</h3>
                    <ListSong list={this.state.listSong} />
                </div>
            </div>
        );
    }
    ShowArtist = () => {
        return (
            <CircleCard list={this.state.listArtist} title="Nghệ sĩ" />
        );
    }
    ShowAlbum = () => {
        return (
            <CardSlider list={this.state.listAlbum} title="Album" />
        );
    }

    async componentDidMount() {
        console.log(this.props.match.params.searchText)
        if (this.props.match.params.searchText) {
            let { songs, artists, albums } = await Services.search(this.props.match.params.searchText);
            this.setState({
                listSong: songs,
                listArtist: artists,
                listAlbum: albums,
                totalLength: this.combineTotal(songs, artists, albums)
            });
        }
    }

    async componentDidUpdate() {
        if (this.props.searchText) {
            let { songs, artists, albums } = await Services.search(this.props.searchText);
            this.setState({
                listSong: songs,
                listArtist: artists,
                listAlbum: albums,
                totalLength: this.combineTotal(songs, artists, albums)
            });
        }
    }

    combineTotal = (songs, artists, albums) => {
        let sLength = 0, alLength = 0, arLength = 0;
        if (songs) {
            sLength = songs.length;
        }
        if (albums) {
            alLength = albums.length;
        }
        if (artists) {
            arLength = artists.length;
        }
        return sLength + alLength + arLength;
    }

    render() {
        let searchText = this.props.searchText;
        
        this.menus = [
            {
                name: "Tất cả",
                url: "/timkiem/tatca/" + searchText,
                list: 1
            },
            {
                name: "Bài hát",
                url: "/timkiem/baihat/" + searchText,
                list: this.state.listSong
            },
            {
                name: "Album",
                url: "/timkiem/album/" + searchText,
                list: this.state.listAlbum
            },
            {
                name: "Nghệ sĩ",
                url: "/timkiem/nghesi/" + searchText,
                list: this.state.listArtist
            },
        ];

        return (
            <React.Fragment>
                <div className="searchBody row">
                    <this.ShowTitleResult />
                    <div className=" col-3">
                        <ChildMenu menus={this.menus} />
                    </div>
                    <div className="col-9 body ">
                        <Switch>
                            <Route path="/timkiem/tatca/:searchText" render={() => <this.ShowAll />} />
                            <Route path="/timkiem/baihat/:searchText" render={() => <this.ShowSong />} />
                            <Route path="/timkiem/album/:searchText" render={() => <this.ShowAlbum />} />
                            <Route path="/timkiem/nghesi/:searchText" render={() => <this.ShowArtist />} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    console.log(state.searchText)
    return { searchText: state.searchText };
}

export default connect(mapStateToProps)(SearchPage);