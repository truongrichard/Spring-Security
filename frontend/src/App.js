import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import EtudiantContenu from "./components/contenu-etudiant.component";
import EmployeurContenu from "./components/contenu-employeur.component";
import GestionnaireContenu from "./components/contenu-gestionnaire.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      showEmployeur: false,
      showGestionnaire: false,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showEmployeur: user.roles.includes("ROLE_EMPLOYEUR"),
        showGestionnaire: user.roles.includes("ROLE_GESTIONNAIRE"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showEmployeur, showGestionnaire } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            EQ1
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showEmployeur && (
              <li className="nav-item">
                <Link to={"/employeur"} className="nav-link">
                  Employeur
                </Link>
              </li>
            )}

            {showGestionnaire && (
              <li className="nav-item">
                <Link to={"/gestionnaire"} className="nav-link">
                  Gestionnaire
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/etudiant"} className="nav-link">
                  Etudiant
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/etudiant" component={EtudiantContenu} />
            <Route path="/employeur" component={EmployeurContenu} />
            <Route path="/gestionnaire" component={GestionnaireContenu} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
