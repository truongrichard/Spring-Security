import Employeur from './Employeur'
export default class Stage{
    id;
    titre = "";
    description = "";
    exigences= "";
    dateDebut= "";
    dateFin= "";
    nbHeuresParSemaine= "";
    salaire= "";
    nbAdmis= "";
    ouvert= "";
    dateLimiteCandidature= "";
    programme= "";
    ville ="";
    employeur= new Employeur();
}