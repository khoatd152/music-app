/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListSong from '../../ListSongComponent/ListSongComponent';
import './SongDetailPage.css';
import config from '../../../Common';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

class SongDetailPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info: {
                artists: [{
                    _id: null
                }]
            },
            recommend: []
        };
    }

    async componentDidMount() {
        let _id = this.props.match.params.id;
        let [info, recommendList] = await Promise.all([
            fetch(config.API_SERVER + 'song/' + _id).then(res => res.json()),
            fetch(config.API_SERVER + 'song/recommend/' + _id).then(res => res.json())
        ]);
        console.table(info)
        this.setState({
            info: info[0],
            recommend: recommendList
        });
    }

    ShowArtist = (obj) => {
        if (obj.artists) {
            return obj.artists.map((element, index) => {
                if (index === obj.artists.length - 1) {
                    return (
                        <a className="artistSongDetail">{element.name}</a>
                    );
                }
                else {
                    return (
                        <React.Fragment>
                            <a className="artistSongDetail">{element.name}</a> <span style={{ color: "white" }}>, </span>
                        </React.Fragment>
                    );
                }
            })
        }
        return <React.Fragment />
    }

    render() {
        return (
            <React.Fragment>
                <div className="songDetail row ">

                    <div className="header col-12">
                        <div className="background"
                            style={{ background: 'url("' + this.state.info.img + '") center center / cover no-repeat rgb(183, 187, 184)' }}
                        ></div>
                        <div className="sub-container row col-12" >

                            <div className="songDetailImg col-xl-2 col-4">
                                <img className="img-fluid" src={this.state.info.img} />
                            </div>

                            <div className="info col-xl-9 col-8">
                                <h3>{this.state.info.name}</h3>
                                <div>
                                    <this.ShowArtist artists={this.state.info.artists} />
                                </div>
                                <div className="moreInfo">
                                    <div className="composer" style={{ display: this.state.info.composer ? "block" : "none" }}>
                                        <span>Sáng tác: </span>
                                        <a>{this.state.info.composer ? this.state.composer.name : null}</a>
                                    </div>
                                </div>
                                <div className="log-stats float-right row">
                                    <div><i className="fas fa-play"></i> {this.state.info.views}</div>
                                    <div><i className="fas fa-heart"></i> {this.state.info.like}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="controlSongDetail  col-12">
                        <div className="">
                            <a className="btn" > <i className="fas fa-play" ></i> Tiếp tục phát</a>
                        </div>
                        <div className="">
                            <a className="" > <i className="far fa-play-circle"></i> Thêm vào danh sách bài hát</a>
                        </div>
                        <div className="">
                            <a className="" > <i className="fas fa-heart" ></i> Thích</a>
                        </div>
                        <div className="">
                            <a onClick={() => config.OpenAddPlaylistModal(this.props.currentSong, this.props.dispatch)} className="" > <i className="fas fa-plus" ></i> Thêm vào</a>
                        </div>
                    </div>

                    <div className="artistAndLyrics row col-8">
                        <div className="row artistInfo col-12">
                            <img src={this.state.info.artists[0].img} className="img-fluid" alt="Responsive image" />
                            <div className="col-5">
                                <Link className={"artistTitle"} to={"/nghesi/" + this.state.info.artists[0]._id}> {this.state.info.artists[0].name}</Link>
                                <br></br>
                                <div>{this.state.info.artists[0].follow} lượt theo dõi</div>
                            </div>
                        </div>
                        <div className="row lyricsInfo col-12">
                            <h4 className="row  col-12">
                                Lời bài hát
                            </h4>
                            <div className="lyrics col-12 row">
                                {ReactHtmlParser(this.state.info.lyrics)}
                            </div>
                        </div>
                    </div>

                    <div className="col-4 recommendPanel">
                        <h4>
                            Có thể bạn quan tâm
                        </h4>
                        <ul className="recommend col-12">
                            <ListSong list={this.state.recommend} hideControl={true} />
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return { currentSong: state.currentSong };
}
export default connect(mapStateToProps)(SongDetailPage);