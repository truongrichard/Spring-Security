import React, { Component } from 'react';
import AuthService from "../service/auth.service";

export default class Home extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          userReady: false,
          currentUser: { username: "" }
        };
      }

    componentDidMount() {
        if (this.props.location.search === "?refresh"){
             this.props.history.replace("/")
            window.location.reload(false);
        }

        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) {
            this.setState({ currentUser: "" })
        }
        else{
            this.setState({ currentUser: currentUser, userReady: true })
        }
    }

    render(){
      
        const { currentUser } = this.state.currentUser;

        return(
            <div className="container">
            {(this.state.userReady) ?
            <div>
            <header className="jumbotron">
              <h3>Profile</h3>
            </header>
            <p>
              <strong>Token:</strong>{" "}
              {JSON.parse(localStorage.getItem('user')).accessToken}
            </p>
            <p>
              <strong>Id:</strong>{" "}
              {JSON.parse(localStorage.getItem('user')).id}
            </p>
            <strong>Authorities:</strong>
            <ul>
              {JSON.parse(localStorage.getItem('user')).roles[0]}
            </ul>
          </div>: null}
          </div>
        );
    }
}