import User from "./User";

export default class Etudiant extends User {
    matricule = "";
    nom = "";
    prenom = "";
    programme = "";
    telephone = "";
    adresse = "";
    statutStage = "";
    stage;
    cv;
}