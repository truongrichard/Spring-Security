import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getEtudiantContenu() {
    return axios.get(API_URL + 'etudiant', { headers: authHeader() });
  }

  getEmployeurContenu() {
    return axios.get(API_URL + 'employeur', { headers: authHeader() });
  }

  getGestionnaireContenu() {
    return axios.get(API_URL + 'gestionnaire', { headers: authHeader() });
  }
}

export default new UserService();
