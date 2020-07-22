import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getMatchesWon, clearMatchData } from "../actions/extraActions";
import { connect } from "react-redux";



class Sport extends Component {
    constructor() {
        super();
        this.state = {
            team: ''
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        this.props.getMatchesWon(this.state.team);
    }

    componentWillUnmount() {
        this.props.clearMatchData();
    }

    render() {

        let matchesWon;
        const searchTeam = this.props.searchTeam;
        if (this.props.matchesWon) {
            matchesWon = this.props.matchesWon.map(against => {
                // <p>{against.homeTeam}</p>
                // if(this.state.team.toLowerCase() == against.homeTeam.toLowerCase()){
                //     <p>{against.homeTeam}</p>
                // }else{
                //     <p>{against.awayTeam}</p>
                // }

                if (searchTeam == against.homeTeam) {

                    return <p>{against.awayTeam} on {against.dom}</p>
                } else {
                    return <p>{against.homeTeam} on {against.dom}</p>

                }
            })
        }

        return (
            <div>
                <h1 className="PageTitle">Sports</h1>
                <Link to={`/${this.props.userId}/dashboard`}>Back</Link>
                <form onSubmit={this.onSubmit}>
                  
                    <input
                        className="WrapperInputs"
                        placeholder="Team name"
                        onChange={this.onChange}
                        value={this.state.team}
                        id="team"
                        type="text"
                    />

                    <button type="submit">
                        hit it!
                    </button>
                </form>
                <div style={{'text-align': 'left', 'padding-left': '10%'}}>
                {
                    searchTeam ? <h1>Matches won against:</h1> : <p></p>
                }
                {matchesWon}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    matchesWon: state.extras.matchesWon,
    searchTeam: state.extras.searchTeam
})

export default connect(mapStateToProps, { getMatchesWon, clearMatchData })(Sport);