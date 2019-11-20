/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from '../../Common';
import AritstComponent from '../ArtistComponent/ArtistComponent';
import { Link } from 'react-router-dom';
class SongPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            textSearch: "",
            checkedListSong: []
        };
    }



    closeSongPanel = () => {
        this.props.dispatch({
            type: config.ACTION.OPEN_SONG_PANEL,
            openSongPanel: false,
            checkedListSong: []
        });
    }



    ShowHeader = () => {
        if (this.state.isSearching) {
            return (
                <div className="form-group col-10 ">
                    <div className="row col-12">
                        <input
                            type="text"
                            className=" inputSearchListSong col-10"
                            placeholder="Tìm kiếm ..."
                            onInput={this.searchInListSong}
                            value={this.state.textSearch}
                        />
                        <a onClick={this.openSearchBar} className="closeSearchButton col-1">Đóng</a>
                    </div>
                </div>
            );
        }
        else {
            return (
                <React.Fragment>
                    <div className="title col-9">
                        <div className="round">
                            <input type="checkbox"
                                id="checkAll"
                                checked={this.state.checkedListSong.length === this.props.listSong.length}
                                onClick={this.checkAll}
                                onChange={this.changeChkBox}
                            />
                            <label htmlFor="checkAll"></label>
                            <span className="content-title">
                                Đã chọn({this.state.checkedListSong.length})
                            </span>
                        </div>
                    </div>
                    <div className="search col-3">
                        {this.ShowCheckingListSong()}
                    </div>
                </React.Fragment>
            );
        }
    }

    ShowCheckingListSong = () => {
        return (
            <div>
                <a onClick={this.removeListSong} style={{ display: this.state.checkedListSong.length ? "block" : "none" }}>
                    <i className="far fa-trash-alt"></i>
                </a>
                <a
                    style={{ display: this.state.checkedListSong.length ? "none" : "block" }}
                    onClick={this.openSearchBar}
                >
                    <i className="fas fa-search"></i>
                </a>
            </div>

        );
    }

    ShowListSong = () => {
        let textSearch = this.convertLatin(this.state.textSearch);
        return this.props.listSong.map((item, index) => {
            let active = this.props.currentSong._id === item._id ? "activeSong" : "";
            let chk = "chk" + item._id;
            if (!textSearch
                || (textSearch
                    && (this.convertLatin(item.name).includes(textSearch)
                        || item.artists.findIndex(a => this.convertLatin(a.name).includes(textSearch)) >= 0))) {
                return (
                    <div
                        className={"item col-12 row " + active}
                        key={index}>
                        <div className="round">
                            <input type="checkbox" className="getChk" id={chk}
                                onChange={this.changeChkBox}
                                checked={this.state.checkedListSong.includes(item._id.toString())}
                            />
                            <label data-id={item._id} onClick={this.checkSong} htmlFor={chk}></label>
                        </div>
                        <Link className="img" to="#"
                            style={{
                                backgroundImage: 'url("' + item.img + '")'
                            }}>
                        </Link>
                        <div className=" col-6">
                            <a onClick={() => config.ChangeSong(item, this.props.dispatch)} className="songName">{item.name}</a><br></br>
                            <AritstComponent artists={item.artists} />
                        </div>
                        <div className="control col-4">
                            <a onClick={() => config.OpenAddPlaylistModal(item, this.props.dispatch)}>
                                <i className="fas fa-plus "></i>
                            </a>
                            <a><i className="fas fa-heart"></i></a>
                            <a><i className="fas fa-download"></i></a>
                            <a><i className="fas fa-info-circle"></i></a>
                        </div>
                    </div>
                )
            }
            else {
                return (<React.Fragment></React.Fragment>);
            }
        });
    }


    checkSong = (e) => {
        let element = document.getElementById('chk' + e.target.dataset.id);
        let id = e.target.dataset.id;
        let checkedListSong;
        if (element.checked) {
            checkedListSong = [...this.state.checkedListSong].filter(p => p != id);
        }
        else {
            checkedListSong = [...this.state.checkedListSong, id];
        }
        this.setState({
            checkedListSong: checkedListSong
        });
    }


    checkAll = (e) => {
        let IDs = [];
        let chkbox = document.getElementById('checkAll');
        let elements = document.getElementsByClassName('getChk');
        if (chkbox.checked) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].checked = true;
                IDs.push(elements[i].id.substr(elements[i].id.indexOf('k') + 1, elements[i].id.length))
            }
        }
        else {
            for (let i = 0; i < elements.length; i++) {
                elements[i].checked = false;
            }
        }
        this.setState({
            checkedListSong: IDs
        });
    }


    removeListSong = () => {
        this.props.dispatch({
            type: 'REMOVE_ITEM_LIST_SONG',
            listSongRemoved: this.state.checkedListSong
        });
        this.setState({
            checkedListSong: []
        });
    }

    searchInListSong = (e) => {
        let textSearch = e.target.value;
        this.setState({
            textSearch: textSearch
        })
    }

    openSearchBar = () => {
        this.setState({
            isSearching: !this.state.isSearching,
            textSearch: ""
        });
    }

    changeChkBox = () => {

    }


    convertLatin(str) {
        if (str) {
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
            str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
            str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
            str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
            str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
            str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
            str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
            str = str.replace(/Đ/g, "D");
            return str.toLowerCase();
        }
        return null;
    }

    render() {
        return (
            <div className="col-10 offset-1 listSongPanel " style={{ display: this.props.openSongPanel ? "block" : "none" }}>
                <div className="backgroundImg"></div>
                <div className="listSongContent row">
                    <div className="body col-7">
                        <div className="header row">
                            <this.ShowHeader></this.ShowHeader>
                        </div>
                        <div className="listSong row col-12">
                            {this.ShowListSong()}
                        </div>
                    </div>
                    <div className="infoSong col-5 row">
                        <div className=" col-12">
                            <a onClick={this.closeSongPanel}>
                                <i className="fas fa-chevron-down closeListSong"></i>
                            </a>
                        </div>
                        <div className="col-8 offset-2 imgInListSong"
                        >
                            <img src={this.props.currentSong.img} />
                        </div>
                        <div className="details col-12">
                            <div className="song">
                                {this.props.currentSong.name}
                            </div>
                            <div className="artist">
                                <AritstComponent artists={this.props.currentSong.artists} />
                            </div>
                        </div>
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
        openSongPanel: state.openSongPanel
    };
}
export default connect(mapStateToProps)(SongPanel);