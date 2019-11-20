/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

export default class Aritst extends Component {
    render() {
        if (!this.props.artists || !this.props.artists.length) return null;
        const customClass = this.props.cls || "artistName";
        return this.props.artists.map((element, index) => {
            return (
                <a
                    key={index}
                    data-role="artist"
                    href={"/artist/" + element._id}
                    title={element.name}
                    className={customClass}>
                    {element.name}
                </a>
            );
        }).reduce((prev, curr) => [prev, ', ', curr]);
    }

}