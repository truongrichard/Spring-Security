import React, { Component } from 'react';
import EmployeurService from '../service/EmployeurService'
import CreateStageComponent from './CreateStageComponent';

import { Redirect } from 'react-router-dom'

class HomeEmployeur extends Component {
    constructor(props) {
        super(props);
        this.state = { employeur: {}, createStage: false };
        this.handleCreateStage = this.handleCreateStage.bind(this)

    }

    async componentDidMount() {

        let role = JSON.parse(localStorage.getItem('user')).roles[0]
        let token = JSON.parse(localStorage.getItem('user')).accessToken
        let exp = JSON.parse(atob(token.split('.')[1])).exp * 1000
        console.log(role)
        console.log(token)
        console.log(exp)
        console.log(Date.now() > exp)

        if(Date.now() > exp && role == "ROLE_EMPLOYEUR"){
            this.setState({
                readyToRedirect: true
            });
        }

        var id;
        if (localStorage.getItem("desc") == "Etudiant")
            id = localStorage.getItem("id");

        EmployeurService.getById(id).then((res) => this.setState({ employeur: res }))
    }

    handleCreateStage() {
        console.log(this.state.createStage)
        this.setState({ createStage: !this.state.createStage })
    }

    render() {

        if (this.state.readyToRedirect) return <Redirect to="/" />

        const createStage = this.state.createStage;
        let button;
        if (createStage) { button = <button><CreateStageComponent /></button> }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className=" col-3">
                    <div className="row">
                        <button onClick={this.handleCreateStage.bind(this)}>Create stage</button>
                        </div>

                        <div className="row">   
                        <button onClick={this.handleCreateStage.bind(this)}>Voir mes stages</button>
                        </div>
                    </div>

                    <div className=" col-9">
                        {this.state.createStage &&
                            <CreateStageComponent employeur= {this.state.employeur}/>
                        }

                        
                    </div>
                </div>

                


            </div>
        );
    }
}

export default HomeEmployeur;