import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Famille } from 'src/app/models/famille.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FamilleService {
  private dbPath = '/famille';
  private familleCollection: AngularFirestoreCollection<Famille>;

  constructor(private db: AngularFirestore) {
    // Initialisation de la collection
    this.familleCollection = this.db.collection(this.dbPath);
  }

  /**
   * Récupère tous les membres de la collection "famille" depuis Firestore.
   */
  getMembres() : any {
    return this.familleCollection.snapshotChanges().pipe(
      map((changes: any) => {
        return changes.map((doc:any) => {
          return ({id: doc.payload.doc.id, ...doc.payload.doc.data()})
        })
      })
    );
  }

  newMembre(membre: Famille): any {
    return new Observable((obs) => {
      if (!membre.id) {
        obs.error('L\'ID du membre est requis');
        return;
      }
  
      this.familleCollection
        .doc(membre.id) // Utiliser membre.id comme ID du document
        .set({ ...membre } as Famille) // Ajouter les données
        .then(() => {
          obs.next(); // Notifier que l'opération a réussi
          obs.complete();
        })
        .catch((error) => {
          obs.error(error); // Gérer les erreurs
        });
    });
  }
  



  get(id: any): any {
    return new Observable((obs) => {
      this.familleCollection.doc(id).get().subscribe((res) => {
        if (res.exists) {
          // Document trouvé, retourne ses données
          obs.next({ id: res.id, ...res.data() });
        } else {
          console.error(`Document avec l'ID ${id} introuvable !`);
          obs.next(null); // Retourne null si le document n'existe pas
        }
      });
    });
  }
  
  update(famille:Famille) {
    return new Observable(obs => {
      this.familleCollection.doc(famille.id).update(famille);
      obs.next();
    });
  }
/* 
  delete(id: any) {
    this.db.doc(`famille/${id}`).delete();
  } */

  async delete(id: any) {
    try {
      console.log("id de la fonction delete", id);
      await this.db.doc(`famille/${id}`).delete();
      console.log('Document supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du document :', error);
    }
  } 

}
