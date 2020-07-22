import React, { Component } from "react";
import { logoutUser } from "../actions/authActions";
import { connect } from 'react-redux';
import Weather from './cards/Weather';
import News from './cards/News';
import Sport from './cards/Sport';
import Photos from './cards/Photos';
import Tasks from './cards/Tasks';
import Cloths from './cards/Cloths';
import "../assets/styles/dashboard.css";

class DashBoard extends Component {
    constructor() {
        super();
        this.state = {

        };
    }


    logout() {
        this.props.logoutUser();
        this.props.history.push('/');
    }

    render() {

        return (
            <div className="Dashboard">
                <div className="Header">
                    <button onClick={() => this.logout()}>logout</button>
                    <h1>Hello, {this.props.user.username}</h1>
                </div>

                <div className="item-a">
                    <Weather />
                </div>
                <div className="item-b">
                    <News />
                </div>
                <div className="item-c">
                    <Sport />
                </div>
                <div className="item-d">
                    <Photos />
                </div>
                <div className="item-e">
                    <Tasks />
                </div>
                <div className="item-f">
                    <Cloths />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => {
            dispatch(logoutUser())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);