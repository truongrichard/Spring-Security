class GestionnaireService{

    verifyRole(){
        let role = JSON.parse(localStorage.getItem('user')).roles[0]
        return role === "ROLE_GESTIONNAIRE";
    }
    
}

export default new GestionnaireService()