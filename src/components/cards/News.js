import React, { Component } from "react";
import {connect } from "react-redux";
import { Link } from "react-router-dom";
import {getLatestNews} from "../../actions/extraActions";

class News extends Component {
    constructor() {
        super();
        this.state = {
            
        };
      
    }
    componentDidMount(){
        this.props.getLatestNews();
    }

    render() {
        
        
        return (
            <div className="ContentContainer">
            <h1 className="CardHeader">
            <Link to={`/${this.props.userId}/news`}>News</Link>
            </h1>
            <p>
            {this.props.news.title}
            </p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userId : state.auth.user.id,
    news: state.extras.news
})

export default connect (mapStateToProps, {getLatestNews})(News);