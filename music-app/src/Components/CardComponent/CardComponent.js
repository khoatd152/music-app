/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './Card.css';
import config from '../../Common';
import { Link } from 'react-router-dom';

class Card extends Component {

    ShowList = () => {
        if (this.props.list) {
            return this.props.list.map((element, index) => {
                if (this.props.isPlaylist) {
                    return (
                        <Link to={"/canhan/playlist/" + element._id}
                            class="col-md-3 col-6"
                            key={index}>
                            <div class="card">
                                <div class="card-img-top card-img-top-250">
                                    <img class="img-fluid" src={element.img ? element.img : config.defaultImg} alt="Carousel 4" />
                                </div>
                                <div class="card-block p-t-2">
                                    <h6 class=" text-wide p-b-2 titleCardItem" title={element.name}> {element.name}</h6>
                                </div>
                            </div>
                        </Link>
                    );
                }
            });
        }
        return <React.Fragment />;
    }

    render() {
        return (
            <React.Fragment>
                <this.ShowList></this.ShowList>
            </React.Fragment>
        );
    }
}

export default Card;