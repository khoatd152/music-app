/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import config from '../../Common';
import './Modal.css';
import services from '../../Services/Services';

class CustomModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
        this.playlistName = React.createRef();
    }

    ShowPlaylists = () => {
        return this.state.list.map((element, index) => {
            return (
                <li key={index} className="col-12 item">
                    <a onClick={() => this.addSongIntoPlaylist(element)} className={"card mb-3 "} >
                        <div className="row no-gutters">
                            <div className="col-md-2">
                                <img src={element.img ? element.img : config.defaultImg} className="card-img" alt="..." />
                            </div>
                            <div className="col-md-10">
                                <div className="card-body">
                                    <h5
                                        className={`card-title ${element.songs.includes(this.props.modal.song._id) ? "activePlaylist" : ""}`}>
                                        {element.name}</h5>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
            );
        });

    }

    ShowArtists = (artists) => {
        if (!artists || !artists.length) return null;
        return artists.map((element, index) => {
            return <span key={index}>{element.name}</span>;
        }).reduce((prev, curr) => [prev, ', ', curr]);
    }


    ShowCustomModal = () => {
        let modal = this.props.modal;
        if (modal) {
            if (modal.type == 1) { //add playlist modal
                return (
                    <React.Fragment>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Thêm vào
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="customModal">
                                <div className=" songInfo row ">
                                    <img src={modal.song.img} className="img-fluid" alt="Responsive image" />
                                    <div className="info col-8">
                                        <span className="">{modal.song.name}</span>
                                        <div className="artists ">
                                            {this.ShowArtists(modal.song.artists)}
                                        </div>
                                    </div>
                                </div>
                                <ul className="playlists nonePadding row" >
                                    <this.ShowPlaylists />
                                </ul>
                                <div className="form-group playlistControl">
                                    <input ref={this.playlistName} type="text" className="form-control " />
                                    <a onClick={this.addNewPlaylist} className="btn float-right "><i className="fas fa-play"></i>Thêm playlist</a>
                                </div>
                            </div>
                        </Modal.Body>
                    </React.Fragment>
                );
            }
        }
        return <React.Fragment />;
    }

    openModal = () => {
        fetch(config.API_SERVER + 'playlist/' + this.props.user._id).then(res => res.json()).then(res => {
            this.setState({
                list: res
            })
        })
    }
    closeModal = () => {
        this.props.dispatch({
            type: config.ACTION.CLOSE_MODAL
        })
    }

    addNewPlaylist = () => {
        config.AddNewPlaylist(this.props.user._id, this.playlistName.current.value, () => {
            //reload playlist
            this.openModal();
            this.playlistName.current.value = null;
        })

    }

    addSongIntoPlaylist = (playlist) => {
        config.AddSongIntoPlaylist(playlist, this.props.user, this.props.modal.song, () => {
            this.openModal();
        })
    }

    render() {
        if (this.props.user) {
            return (
                <Modal
                    size="sm"
                    onHide={this.closeModal}
                    onShow={this.openModal}
                    show={this.props.modal.isShow} >
                    <this.ShowCustomModal />
                </Modal>
            )
        }
        else {
            config.ShowLoginModal(true, this.props.dispatch);
            return <React.Fragment />
        }
    }
}

function mapStateToProps(state) {
    return {
        modal: state.modal,
        user: state.user
    };
}

export default connect(mapStateToProps)(CustomModal);