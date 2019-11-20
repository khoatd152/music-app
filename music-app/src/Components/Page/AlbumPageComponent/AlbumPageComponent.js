/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import './AlbumPage.css';
import { connect } from 'react-redux';
import config from '../../../Common';
import { Link } from 'react-router-dom';

class AlbumPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            album: null
        }
    }

    async componentDidMount() {
        fetch(config.API_SERVER + '/album').then(res => res.json()).then(result => {
            this.setState({
                album: result
            })
        });
    }

    ShowAlbumList = () => {
        if (this.state.album) {
            return this.state.album.map((element, index) => {
                return (
                    <Link to={"/album/" + element._id}
                        className="albumItem col-lg-2 col-4"
                        key={index}
                    >
                        <div className="albumImg">
                            <img className="img-fluid" src={element.img} />
                            <div className="albumName ">
                                <div className="textOverflow">{element.name}</div>
                                <div className="textOverflow textArtist">{element.artist}</div>
                            </div>
                        </div>
                    </Link>
                );
            });
        }
        else {
            return <React.Fragment />;
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="AlbumBody row">
                    <div className="titleSlider  col-12">
                        Album
                    </div>
                    <this.ShowAlbumList></this.ShowAlbumList>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(AlbumPage);