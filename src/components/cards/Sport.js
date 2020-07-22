import React, { Component } from "react";
import {connect } from "react-redux";
import { Link } from "react-router-dom";

class Sport extends Component {
    constructor() {
        super();
        this.state = {
            
        };
      
    }

    render() {
        return (
            <div className="ContentContainer">
            <h1 className="CardHeader">
            <Link to={`/${this.props.userId}/sport`}>Sport</Link>
            </h1>
            <p>click here for sports</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userId : state.auth.user.id
})

export default connect (mapStateToProps, {})(Sport);