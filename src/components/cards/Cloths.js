import React, { Component } from "react";
import { connect } from "react-redux";
import { getClothsList } from "../../actions/extraActions";
import Chart from 'react-apexcharts'

class Cloths extends Component {
    constructor() {
        super();
        this.state = {
          
            series: [44, 55, 13, 43, 11, 11],
            options: {
              labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'f']
            },
          
          
          };

    }

    componentDidMount() {
        this.props.getClothsList();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            series : nextProps.cloths.percentageCount,
            options : {
                ...this.state.options, labels: nextProps.cloths.clothsList
            }
        })
    }
    render() {

        // if(this.props.cloths){

        //     console.log('sssss', this.props.cloths.percentageCount);
        //     console.log('ssssswww', this.props.cloths.clothsList);
        // }
        let piechart;
        if (this.props.cloths) {
            piechart =  <Chart 
            options={this.state.options} 
            series={this.state.series}
            type="pie" 
            width={300} 
            height={300} />
        }

        return (
            <div className="ContentContainer">
                <h1 className="CardHeader">Cloths</h1>
                <div style={{'padding-left':'20%'}}>
                {piechart}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cloths: state.extras.cloths
})

export default connect(mapStateToProps, { getClothsList })(Cloths);