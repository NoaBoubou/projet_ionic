export class Famille {
    update(membre: Famille) {
      throw new Error('Method not implemented.');
    }
    get(id: string | null) {
      throw new Error('Method not implemented.');
    }
    id? : string;
    nom : string;
    prenom : string;
    age : number;
    sexe : string;
    lien : string;
    photo : string;
    telephone : string;
    ville : string;

    constructor(){
        this.nom = "";
        this.prenom = "";
        this.age = 0;
        this.sexe = "";
        this.lien = "";
        this.photo = "";
        this.telephone ="";
        this.ville = "";
    }
}

