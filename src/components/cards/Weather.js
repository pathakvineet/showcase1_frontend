import React, { Component } from "react";
import {getWeatherReport} from "../../actions/extraActions";
import {connect } from "react-redux";


class Weather extends Component {
    constructor() {
        super();
        this.state = {
            
        };
      
    }
    componentDidMount() {
        const {getWeatherReport} = this.props;
        
        navigator.geolocation.getCurrentPosition(
           function (position) {        
                getWeatherReport(position);
            },
            function (error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            }
        )
    }

    render() {
        const {weather} =this.props;
        return (
            <div className="ContentContainer">
                <h1 className="CardHeader">weather</h1>
                
                <p>
                {weather.place}
                </p>
                <p>
                {weather.temp} C
                </p>
                <p>
                {weather.iconCode}
                </p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  weather: state.extras.weather
})

export default connect (mapStateToProps, {getWeatherReport})(Weather);