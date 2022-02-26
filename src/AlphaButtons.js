import React, { Component } from 'react';

class AlphaButtons extends Component{
    render(){
        return(
            <button className ='AlphaButtons' value = {this.props.value}>{this.props.value}</button>
        )
    }
}

export default AlphaButtons