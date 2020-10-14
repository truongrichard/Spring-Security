import React, { Component } from 'react';
import './../App.css';
import './../css/Register.css';
import AuthService from "../service/auth.service";


export default class Logout extends Component {
    constructor(props) {
        super(props);

        AuthService.logout();
        this.props.history.push('/?refresh');
    }

    render(){
        return (
            <div>
                <h3>LOG OUT!</h3>
            </div>
        );
    }
}

