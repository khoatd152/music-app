/* eslint-disable no-useless-constructor */
/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Index';
import './Index.css';
import CardSlider from '../../CardSliderCompenent/CardSliderComponent';
import CircleCard from '../../CircleCardComponent/CircleCardComponent';
import Chart from '../../ChartComponent/ChartComponent';
import NewSong from '../../NewSongComponent/NewSongComponent';
import config from '../../../Common';

// const CardSlider = React.lazy(() => import('../../CardSliderCompenent/CardSliderComponent'));
// const CircleCard = React.lazy(() => import('../../CircleCardComponent/CircleCardComponent'));
// const Chart = React.lazy(() => import('../../ChartComponent/ChartComponent'));
// const NewSong = React.lazy(() => import('../../NewSongComponent/NewSongComponent'));

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            album: null,
            artist: null,
            chart: {},
            newSong: []
        }
    }


    async componentDidMount() {
        // fetch(config.API_SERVER + "song")
        //     .then(res => res.json())
        //     .then((result) => {
        //         console.log(result);
        //         this.props.dispatch({
        //             type: 'CHANGE_LIST_SONG',
        //             listSong: result
        //         });
        //     },
        //         // Note: it's important to handle errors here
        //         // instead of a catch() block so that we don't swallow
        //         // exceptions from actual bugs in components.
        //         (error) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 error
        //             });
        //         }
        //     )



        let [album, artist, week, month, views, newSong] = await Promise.all([
            fetch(config.API_SERVER + 'album/4').then(res => res.json()), //album
            fetch(config.API_SERVER + 'artist/6').then(res => res.json()), //aritst
            fetch(config.API_SERVER + 'chart/1/5').then(res => res.json()), // week chart
            fetch(config.API_SERVER + 'chart/2/5').then(res => res.json()), // month chart
            fetch(config.API_SERVER + 'chart/3/5').then(res => res.json()), // views chart
            fetch(config.API_SERVER + 'newsong/10').then(res => res.json()) //new song
        ]);

        this.setState({
            album: album,
            artist: artist,
            chart: {
                week: week,
                month: month,
                views: views
            },
            newSong: newSong
        }, () => {
            //console.log(this.state.chart);
        });

    }

    render() {
        return (
            <React.Fragment>
                <div className="indexPage">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                            <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                            <li data-target="#carouselExampleIndicators" data-slide-to={2} />
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="https://photo-zmp3.zadn.vn/banner/9/e/1/8/9e182b83a080938aa5b92c17d76bfcdf.jpg" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="https://photo-zmp3.zadn.vn/banner/2/a/0/2/2a026453aa62874d7b1d0600fc407718.jpg" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="https://photo-zmp3.zadn.vn/banner/e/3/a/d/e3addb14b51fcacb8ccf5ca6e7aed22a.jpg" className="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <a style={{ display: "none" }}
                            className="carousel-control-next"
                            href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"
                                id="btnMoveNextSlide"
                            />
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                    <CardSlider list={this.state.album} title="Có thể bạn muốn nghe" id="want"></CardSlider>
                    <CircleCard list={this.state.artist} title="Nghệ Sĩ Nổi Bật"></CircleCard>
                    <Chart chart={this.state.chart} title="Bảng xếp hạng" ></Chart>
                    <NewSong list={this.state.newSong} title="Bài hát mới"></NewSong>
                </div>
            </React.Fragment>
        );
    }
}
function mapStatetoProps(state) {
    return {
        listArtist: state.listArtist,
        listRank: state.listRank
    };
}
export default connect(mapStatetoProps)(Index);
