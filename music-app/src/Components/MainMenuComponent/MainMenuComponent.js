/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './MainMenu.css';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import config from '../../Common';


class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.myTopNav = React.createRef();
        this.state = {};
        this.searchBtn = React.createRef();
    }
    search(e) {
        if (e.target.value && e.key === 'Enter') {
            let searchText = e.target.value;
            this.props.dispatch({
                type: config.ACTION.SEARCH,
                searchText: searchText
            });
            e.target.value = null;
            this.props.history.push('/timkiem/tatca/' + searchText);

        }
    }

    ShowUser = () => {
        return (
            <React.Fragment>
                <div className={this.props.user ? "hidden" : null}>
                    <i className="fas fa-user-circle fa-2x"></i>
                    <a onClick={() => config.ShowLoginModal(true, this.props.dispatch)}>Đăng nhập</a>
                </div>
                <div className={!this.props.user ? "hidden" : null}>
                    <div className="nav-link dropdown-toggle"
                        href="#" id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        <i className="fas fa-user-circle fa-2x"></i>
                        <a>{this.props.user ? this.props.user.username : null}</a>
                    </div>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="#">
                            <i className="fas fa-id-badge"></i> Tài khoản
                             </a>
                        <a className="dropdown-item" onClick={this.logOut} href="#">
                            <i className="fas fa-sign-out-alt"></i> Đăng xuất
                             </a>
                    </div>
                </div>
            </React.Fragment >
        );
    }



    logOut = () => {
        this.props.dispatch({
            type: config.ACTION.LOG_OUT
        });
    }

    checkLogin = (e) => {
        if (!this.props.user) {
            e.preventDefault();
            config.ShowLoginModal(true, this.props.dispatch);
        }
    }


    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light" id="mainMenu">
                    <a className="navbar-brand" href="#"><i className="fas fa-compact-disc fa-2x"></i></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav col-lg-6 col-sm-12">
                            <li className="nav-item">
                                <NavLink to="/trangchu" activeClassName="selected" className="nav-link">Trang Chủ</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/bxh" activeClassName="selected" className="nav-link">Chart</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink to="/album" activeClassName="selected" className="nav-link" >
                                    Album
                            </NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink to="/nghesi" activeClassName="selected" className="nav-link" >
                                    Nghệ sĩ
                            </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink onClick={this.checkLogin} to="/canhan" activeClassName="selected" className="nav-link">Nhạc cá nhân</NavLink>
                            </li>
                        </ul>
                        <div className="form-inline my-2 my-lg-0 col-lg-4 ">
                            <input id="searchBar"
                                onKeyPress={(this.search.bind(this))}
                                className="form-control mr-sm-2"
                                type="search"
                                placeholder="Search" aria-label="Search"
                                autoComplete={"off"}
                            />
                        </div>
                        <li className="nav-item dropdown" style={{ "listStyle": "none" }}>
                            <div>
                                <this.ShowUser></this.ShowUser>
                            </div>
                        </li>
                    </div >
                </nav >
            </React.Fragment>
        );
    }
}
function mapStateToProps(state) {
    return { user: state.user };
}
export default withRouter(connect(mapStateToProps)(MainMenu));