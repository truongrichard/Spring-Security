import React from 'react';
import './App.css';

import EtudiantRegister from "./components/register/EtudiantRegister";
import ListStagesComponent from "./components/employeur/ListStageComponent";
import Login from "./components/login/Login";
import { Route, Switch } from 'react-router-dom';
import Home from "./components/Home";
import HeaderComponent from "./components/HeaderComponent";
import ListEtudiantsComponent from "./components/gestionnaire/ListEtudiantComponent";
import HomeEtudiant from "./components/etudiant/HomeEtudiant";
import Register from './components/register/RegisterComponent';
import Logout from './components/login/Logout';
import CreateStageComponent from './components/employeur/CreateStageComponent'

function App() {
  return (
    
      <main>
        <HeaderComponent />
        <div className="container">
         
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/stages" component={ListStagesComponent}/>
          <Route path='/create' component={EtudiantRegister} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/logout' component={Logout} />
          <Route path="/etudiants" component={ListEtudiantsComponent} />
          <Route path='/etudiant' component={HomeEtudiant} />
          <Route path='/createStage' component={CreateStageComponent} />
        </Switch>
       
        </div>
      </main>
    
  );
}

export default App;
