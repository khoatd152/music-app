/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './ChildMenu.css';

class ChildMenu extends Component {

    ShowList = () => {
        if (this.props.menus) {
            return this.props.menus.map((element, index) => {
                return (
                    <li key={index}>
                        <NavLink activeClassName="c-m-active-tab" to={element.url}>
                            {element.name}
                            <span className="float-right ">
                                {element.list ? element.list.length : 0}
                            </span>
                        </NavLink>
                    </li>
                );
            })
        }
        return <React.Fragment />
    }

    render() {

        return (
            <React.Fragment >
                <ul className="navbarList col-12">
                    <this.ShowList />
                </ul>
            </React.Fragment>
        );
    }
}


export default ChildMenu;