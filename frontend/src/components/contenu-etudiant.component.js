import React, { Component } from "react";

import UserService from "../services/user.service";

import { Redirect } from 'react-router-dom'

export default class EtudiantContenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      readyToRedirect: true,
    };
  }

  componentDidMount() {
    let role = JSON.parse(localStorage.getItem('user')).roles
    let token = JSON.parse(localStorage.getItem('user')).accessToken
    let exp = JSON.parse(atob(token.split('.')[1])).exp * 1000
    console.log(role[0])
    console.log(token)
    console.log(exp)
    console.log(Date.now() > exp)

    if(Date.now() > exp){
      this.setState({
        readyToRedirect: true
      });
    }

    UserService.getEtudiantContenu().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {

    if (this.state.readyToRedirect) return <Redirect to="/login" />

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}
