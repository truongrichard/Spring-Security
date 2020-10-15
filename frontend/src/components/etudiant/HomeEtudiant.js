import React, { Component } from 'react';
import '../../App.css';

import EtudiantService from '../../service/EtudiantService';
import AuthService from '../../service/auth.service';
import { Redirect } from 'react-router-dom';

export default class HomeEtudiant extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            etudiant: {}, 
            displayInvalidFileMessage: false, 
            displaySubmitCVButton: false, 
            hasAlreadyCV: false, 
            hasUploadedCV: false, 
            id: '', 
            readyToRedirect: false,};
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }

    onChangeHandler = event => {
        var files = event.target.files
        if (this.checkMimeType(event)) {
            this.setState(prevState => ({
                etudiant: {
                    ...prevState.etudiant,
                    cv: files[0]
                }
            }))

        }
        this.setState({hasUploadedCV: false});
    }

    async componentDidMount() {

        if(AuthService.verifyTokenExpired && !EtudiantService.verifyRole()){
            this.setState({
                readyToRedirect: true
            });
        }

        var id;
        id = AuthService.getTokenId();

        const {data: etudiant} = await EtudiantService.getEtudiantById(id);
        this.setState({etudiant: etudiant});
        this.setState({hasAlreadyCV: this.state.etudiant.cv !== undefined} );
    }

    onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
    }

    checkMimeType = (event) => {
        let files = event.target.files
        let err = ''
        const types = ['application/pdf']
        for (var x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                err += files[x].type + ' is not a supported format\n'
                this.setState({displayInvalidFileMessage: true});
                this.setState({displaySubmitCVButton: false});
            } else {
                this.setState({displayInvalidFileMessage: false});
                this.setState({displaySubmitCVButton: true});
            }
        };
        if (err !== '') {
            event.target.value = null
            return false;
        }
        return true;

    }
    handleSubmit(event) {
        event.preventDefault()
        
        var id;
        id = AuthService.getTokenId();

        const formData = new FormData();
        formData.append('file', this.state.etudiant.cv);
        EtudiantService.uploadCV(id, formData);
        this.setState({hasUploadedCV: true});
    }


    render() {
        
        if (this.state.readyToRedirect) return <Redirect to="/" />

        return (
            <form onSubmit={this.handleSubmit} className="d-flex flex-column">
            <div className="container">
                <h3>Votre profil</h3>
                <label>Nom complet : {this.state.etudiant.prenom}  {this.state.etudiant.nom}</label><br/>
                <label>Matricule : {this.state.etudiant.matricule} </label><br/>
                <label>Adresse : {this.state.etudiant.adresse}</label><br/>
                <label>Email : {this.state.etudiant.email}</label><br/>
                <label>Adresse : {this.state.etudiant.adresse}</label><br/>
                <label>Programme : {this.state.etudiant.programme}</label><br/>
                <label>Televerser votre CV : <input type="file" name="file"
                                                    className="form-control-file"
                                                    accept="application/pdf"
                                                    ref={this.inputRef}
                                                    defaultValue= {this.state.etudiant.cv}
                                                    onChange={this.onChangeHandler}/>

                </label><br/>
                {this.state.hasAlreadyCV ? <label>Rappel : vous avez déjà téléversé un CV</label>: null}<br/>
                {this.state.displayInvalidFileMessage ?
                    <label style={{color: "red"}}>Ce format de fichier n'est pas autorisé. Seuls les fichiers au format PDF sont autorisés.</label> : null}
                {this.state.displaySubmitCVButton ? <button type="submit" className="btn btn-primary">Enregistrer mon CV</button> : null}<br/>
                {this.state.hasUploadedCV? <label style={{color: "green"}}>Vous venez de téléverser votre CV</label>: null}<br/>
            </div>
            </form>

        );
    }
}