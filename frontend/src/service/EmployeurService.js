import authHeader from './auth-header';

const baseURL = "http://localhost:8080/employeurs";

class EmployeurService{

    verifyRole(){
        let role = JSON.parse(localStorage.getItem('user')).roles[0]
        return role === "ROLE_EMPLOYEUR";
    }

    async getByEmail(email){
        let data;
        await fetch(baseURL +"/email?email=" +email, {method: "GET"} )
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }

    async getById(id) {
        let data;
        await fetch(baseURL + "/get?idEmployeur=" + id, {method: "GET", headers: authHeader() })
            .then(r => data = r.json())
            .catch(error => data = {});
        return data;
    }

    async post(employeur){
        fetch(baseURL + "/createEmploye",
            {method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employeur)} )
            .then(r => r.json());
    }
}

export default new EmployeurService()































