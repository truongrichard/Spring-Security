import React, { Component } from 'react';
import Register from './RegisterComponent';
import HomeEmployeur from './HomeEmployeur';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.location.search === "?refresh"){
             this.props.history.replace("/")
            window.location.reload(false);
        }
    }

    render(){
        return(
           <div></div>
        );
    }
}