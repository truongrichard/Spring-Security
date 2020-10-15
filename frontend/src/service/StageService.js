import axios from 'axios'

import authHeader from './auth-header';

const STAGES_URL = "http://localhost:8080/stages";
const STAGES_URL_POST = "http://localhost:8080/createStage";


class StageService{

    getStages(){
        return axios.get(STAGES_URL);
    }
    
    getStagesByEmployeurId(idEmployeur){
        return axios.get("http://localhost:8080/stageByEmployeurId?idEmployeur=" + idEmployeur, { headers: authHeader() });
    }

    createStage(stage){
        return axios.post(STAGES_URL_POST,stage, { headers: authHeader() });
    }
}

export default new StageService()