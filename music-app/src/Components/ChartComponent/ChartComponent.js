/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import './Chart.css';
import { Link } from 'react-router-dom';
import ArtistComponent from '../ArtistComponent/ArtistComponent';
import { connect } from 'react-redux';
import config from '../../Common';

const ranks = [
    {
        name: "Tuần",
        url: "/bxh/tuan",
        list: []
    },
    {
        name: "Tháng",
        url: "/bxh/thang",
        list: []
    },
    {
        name: "Top 100",
        url: "/bxh/top100",
        list: []
    },
];

class Chart extends Component {

    ShowRankList = () => {
        return ranks.map((element, index) => {
            return (
                <div className="rankVN commonRank col-12 col-lg-4" key={index}>
                    <div className="titleChart">
                        {element.name}
                    </div>
                    {this.ShowRank(element.list)}
                    <div>
                        <Link to={element.url} className="btnMore textChart col-12">Xem thêm</Link>
                    </div>

                </div>
            );
        })
    }

    ShowInfo = (element) => {
        return (
            <div className="songInChart col-9">
                <a onClick={() => config.ChangeSong(element, this.props.dispatch)} className=" overflowText">{element.name}</a>
                <div key={1} data-role="artists" className="row ">
                    <ArtistComponent
                        artists={element.artists}
                        cls={"overflowText"} />
                </div>
            </div>
        );
    }

    ShowRank = (list) => {
        if (list && list.length) {
            return list.map((element, index) => {
                return (
                    <div
                        key={index}
                        className="infoSongInRank textChart row "
                    >
                        <span className="rankOfSong col-1">{index + 1}</span>
                        <div>
                            <img className="chartImg" src={element.img} />
                        </div>
                        {this.ShowInfo(element)}
                    </div>
                );
            });
        }
        return <React.Fragment />
    }

    render() {

        ranks[0].list = this.props.chart.week;
        ranks[1].list = this.props.chart.month;
        ranks[2].list = this.props.chart.views;

        return (
            <div className="rank row  centerIMG" >
                <div className="titleSlider col-12">{this.props.title}</div>
                {this.ShowRankList()}
            </div>
        );
    }
}

export default connect()(Chart);