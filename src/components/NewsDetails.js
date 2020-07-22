import React, {Component } from "react";


class item extends Component{
    render(){
        return(
            <div>
            <h1 className="PageTitle">News</h1>
            <button onClick={this.props.history.goBack} >Back</button>
            </div>
        )
    }
}

export default item;