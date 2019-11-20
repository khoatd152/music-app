/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './CircelCard.css';
import { Card } from 'react-bootstrap';

class CircleCard extends Component {

    ShowListCard = () => {
        if (!this.props.list) return null;
        return this.props.list.map((element, index) => {
            return (
                <Card
                    className="col-4 col-lg-2 pointer text-center"
                    key={index}
                    onClick={() => this.props.history.push('/album/' + element._id)

                    }
                >
                    <Card.Img variant="top" src={element.img} className="rounded-circle" />
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

export default CircleCard;