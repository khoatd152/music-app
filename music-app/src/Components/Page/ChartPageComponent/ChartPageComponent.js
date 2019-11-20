/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './ChartPage.css';
import config from '../../../Common';
import { connect } from 'react-redux';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import ListSong from '../../ListSongComponent/ListSongComponent';

class ChartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            week: null,
            month: null,
            views: null
        }
    }

    async componentDidMount() {

        let [week, month, views] = await Promise.all([
            fetch(config.API_SERVER + 'chart/1/100').then(res => res.json()), // week chart
            fetch(config.API_SERVER + 'chart/2/100').then(res => res.json()), // month chart
            fetch(config.API_SERVER + 'chart/3/100').then(res => res.json()), // views chart
        ]);
        this.setState({
            week: week,
            month: month,
            views: views
        });
    }

    playAllSong = () => {
        let data;
        switch (window.location.pathname) {
            case '/bxh/tuan':
                data = this.state.week;
                break;
            case 'bxh/thang':
                data = this.state.month;
                break;
            default:
                data = this.state.views;
                break;
        }
        config.PlayAll(data, this.props.dispatch);
    }

    render() {
        return (
            <React.Fragment>
                <div className="allRank">
                    <ul className="rankTabs row col-12">
                        <li><NavLink activeClassName="activeTab" to="/bxh/tuan" >Tuần</NavLink></li>
                        <li><NavLink activeClassName="activeTab" to="/bxh/thang" >Tháng</NavLink></li>
                        <li><NavLink activeClassName="activeTab" to="/bxh/top100" >Top 100</NavLink></li>
                    </ul>
                    <div className="rankBody row">
                        <div className="rankControls col-12">
                            <a onClick={this.playAllSong} className="btn"><i className="fas fa-play"></i> Nghe tất cả</a>
                        </div>
                        <div className="rankList col-12">
                            <Switch>
                                <Route path="/bxh/tuan" >
                                    <ListSong list={this.state.week} />
                                </Route>
                                <Route path="/bxh/thang">
                                    <ListSong list={this.state.month} />
                                </Route>
                                <Route path="/bxh/top100" >
                                    <ListSong list={this.state.views} />
                                </Route>
                                <Redirect to="/bxh/tuan" />
                            </Switch>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect()(ChartPage);