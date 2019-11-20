/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './CardSlider';
import './CardSlider.css';
import { Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class CardSlider extends Component {

    ShowListCard = () => {
        if (!this.props.list) return null;
        return this.props.list.map((element, index) => {
            return (
                <Card
                    className="col-3 pointer"
                    key={index}
                    onClick={() => this.props.history.push('/album/' + element._id)

                    }
                >
                    <Card.Img variant="top" src={element.img} />
                    <Card.Body>
                        <Card.Title>{element.name}</Card.Title>
                    </Card.Body>
                </Card>
            );
        });
    }

    render() {
        return (
            <div className="row">
                <div className="titleSlider col-12">{this.props.title}</div>
                <this.ShowListCard></this.ShowListCard>
            </div>
        );
    }
}

export default withRouter(CardSlider);