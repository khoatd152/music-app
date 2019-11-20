import React, { Component } from 'react';
import './LoginModal.css';
import { connect } from 'react-redux';
import config from '../../Common';
import Modal from 'react-bootstrap/Modal'


class LoginModal extends Component {

    //state.modal = 0: login, 1: sign up

    constructor(props) {
        super(props);
        this.state = {
            iUsername: "",
            iPassword: null,
            uUsername: null,
            uEmail: null,
            uPassword: null,
            uRePassword: null,
            message: null,
            isShow: null,
            isLogin: true
        };
    }

    componentDidMount() {
    }

    ShowBodyModal = () => {
        if (this.state.isLogin) {
            return (
                <React.Fragment>

                    <Modal.Body>
                        <div
                            style={{ display: this.state.message ? "block" : "none" }}
                            className="alert alert-danger"
                            role="alert">
                            {this.state.message}
                        </div>
                        <form onSubmit={this.SignIn}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Tài khoản</label>
                                <input type="text"
                                    className="form-control"
                                    onChange={event => this.handleChange(event)} name="iUsername"
                                    aria-describedby="emailHelp"
                                    value={this.state.iUsername}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Mật khẩu</label>
                                <input type="password" className="form-control" onChange={event => this.handleChange(event)} name="iPassword" />
                            </div>
                            <button type="button" onClick={this.SignIn} className="btn btn-primary float-right">Đăng nhập</button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={this.ShowSignUp} className="btn btn-primary">Chưa có tài khoản</button>
                    </Modal.Footer>
                </React.Fragment>
            );
        }
        else {
            return (
                <React.Fragment>

                    <Modal.Body>
                        <form onSubmit={this.SignUp}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Tài khoản</label>
                                <input type="text" onChange={event => this.handleChange(event)} name="uUsername" className="form-control" aria-describedby="emailHelp" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <input type="email" onChange={event => this.handleChange(event)} name="uEmail" className="form-control" aria-describedby="emailHelp" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Mật khẩu</label>
                                <input type="password" onChange={event => this.handleChange(event)} name="uPassword" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Xác nhận mật khẩu</label>
                                <input type="password" onChange={event => this.handleChange(event)} name="uRePassword" className="form-control" />
                            </div>
                            <button type="submit" className="btn btn-primary float-right">Đăng ký</button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={this.ShowSignIn} className="btn btn-primary">Đăng nhập</button>
                    </Modal.Footer>
                </React.Fragment>
            );
        }
    }

    ShowSignUp = () => {
        this.setState({
            isLogin: false
        });
    }

    ShowSignIn = () => {
        this.setState({
            isLogin: true
        });
    }



    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }


    SignIn = (e) => {
        e.preventDefault();
        fetch(config.API_SERVER + 'login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.iUsername,
                password: this.state.iPassword
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    this.props.dispatch({
                        type: config.ACTION.LOG_IN,
                        user: result
                    });
                }
                else {
                    this.setState({
                        message: 'Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại'
                    })
                }

            });
    }

    SignUp = (e) => {
        e.preventDefault();
        fetch(config.API_SERVER + 'user', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.iUsername,
                password: this.state.iPassword
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    this.props.dispatch({
                        type: config.ACTION.LOG_IN,
                        user: result
                    });
                }
                else {
                    this.setState({
                        message: result.message
                    })
                }

            });
    }



    closingLoginModal = () => {
        config.ShowLoginModal(false, this.props.dispatch);
        this.setState({
            iUsername: "",
            iPassword: null,
            uUsername: null,
            uEmail: null,
            uPassword: null,
            uRePassword: null,
            message: null,
            isLogin: true
        });

    }


    render() {
        return (
            <React.Fragment>
                <div>
                    <div className="modal fade" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                        <Modal
                            show={this.props.showLogin}
                            onHide={this.closingLoginModal}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    <h5 className="modal-title">
                                        {this.state.isLogin ? "Đăng nhập" : "Đăng ký"}
                                    </h5></Modal.Title>
                            </Modal.Header>
                            <this.ShowBodyModal />
                        </Modal>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return { showLogin: state.showLogin };
}

export default connect(mapStateToProps)(LoginModal);