import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircleCard from '../../CircleCardComponent/CircleCardComponent';
import config from '../../../Common';

class Artist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            artist: null
        }
    }

    async componentDidMount() {
        fetch(config.API_SERVER + 'artist').then(res => res.json()).then(result => {
            console.table(result);
            this.setState({
                artist: result
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="artistBody row">
                    <div className="titleSlider  col-12">
                        Nghệ sĩ
                    </div>
                    {/* <this.ShowArtist></this.ShowArtist> */}
                    <CircleCard list={this.state.artist}></CircleCard>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Artist);