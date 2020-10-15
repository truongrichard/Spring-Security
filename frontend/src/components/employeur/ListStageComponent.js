import React, { Component } from 'react';
import StageService from '../../service/StageService';
import EmployeurService from '../../service/EmployeurService';
import AuthService from '../../service/auth.service';
import { Redirect } from 'react-router-dom';

export default class ListStagesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: [],
            employeurId: "",
            readyToRedirect: false,
        };

        this.addStage = this.addStage.bind(this);
    }

    addStage() {

        this.props.history.push('/createStage')
    }


    componentDidMount() {

        if(AuthService.verifyTokenExpired && !EmployeurService.verifyRole()){
            this.setState({
                readyToRedirect: true
            });
        }

        var id;
        id = AuthService.getTokenId();
        
        StageService.getStagesByEmployeurId(id).then((res) => { this.setState({ stage: res.data }) })
    }
    
    render() {
        
        if (this.state.readyToRedirect) return <Redirect to="/" />

        return (

            <div className="container">
                <div className="col">
                    <div className="pt-3 mt-3">
                        <h5 className="card-title text-center p-3" style={{ background: '#E3F9F0 ' }}>Stages</h5>

                        <div className="row">

                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr >
                                        <th> Titre </th>
                                        <th> Programme </th>
                                        <th> Description </th>
                                        <th> date Début </th>
                                        <th> date Finale </th>
                                        <th> Ville </th>
                                        <th> Heures par semaine </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.stage.map(
                                        stage =>
                                            <tr key={stage.id}>
                                                <td>{stage.titre}</td>
                                                <td>{stage.programme}</td>
                                                <td>{stage.description}</td>
                                                <td>{stage.dateDebut}</td>
                                                <td>{stage.dateFin}</td>
                                                <td>{stage.ville}</td>
                                                <td>{stage.nbHeuresParSemaine}</td>
                                            </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

