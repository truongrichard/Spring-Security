import axios from 'axios'
import authHeader from './auth-header';

const ETUDIANTS_URL = "http://localhost:8080/etudiants/findAll";
const baseURL = "http://localhost:8080/etudiants";

class EtudiantService{

    verifyRole(){
        let role = JSON.parse(localStorage.getItem('user')).roles[0]
        return role === "ROLE_ETUDIANT";
    }

    getEtudiantById(idEtudiant){
        return axios.get("http://localhost:8080/etudiants/get?idEtudiant=" + idEtudiant, { headers: authHeader() });
    }

    uploadCV(id, formData){
        const user = JSON.parse(localStorage.getItem('user'));
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + user.accessToken
        }
        return axios.put("http://localhost:8080/etudiants/saveCV/" + id, formData, { headers: headers })
    }

    getEtudiants(){
        return axios.get(ETUDIANTS_URL, { headers: authHeader() });
    }

    async getByEmail(email){
        let data;
        await fetch(baseURL +"/email?email=" +email, {method: "GET"} )
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }

    async post(etudiant){
        fetch(baseURL + "/create",
            {method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(etudiant)} )
            .then(r => r.json());
    }
}

export default new EtudiantService()