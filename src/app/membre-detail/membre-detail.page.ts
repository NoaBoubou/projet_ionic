import { Component, OnInit } from '@angular/core';
import { Famille } from '../models/famille.model';
import { FamilleService } from '../services/famille/famille.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-membre-detail',
  templateUrl: './membre-detail.page.html',
  styleUrls: ['./membre-detail.page.scss'],
})
export class MembreDetailPage implements OnInit {
  membre!: Famille; 
  modif: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private familleService: FamilleService,
    private toastCtrl: ToastController,
    private alertCtrl : AlertController,
    private router : Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.familleService.get(id).subscribe((value: any) => {
      console.log(value);
      this.membre = value;
    });
    console.log(this.membre);
  }


  async setModif() {
    if(!this.modif) {
/*       const alert = await this.alertCtrl.create({
        header : 'Etes vous sur de vouloir modifier ?',
        subHeader: 'Vous rendrez possible la modification',
        buttons : [
          {
            text: 'Annuler',
            role: 'Cancel'
          }, {
            text: 'Configurer',
            handler: () => {this.modif = !this.modif}
          }
        ]
      });
      await alert.present();
    } else { */
      this.modif = !this.modif;
    }
  }

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Vos modifications sont enregistrées',
      duration: 2000
    });
    (await toast).present();
  }


  onModif() {
    this.familleService.update(this.membre).subscribe(() => {
      this.presentToast();
      this.modif = false;
    });
  }

  onCancel() {
    this.modif = false;
  }

  async onDelete(id: any) {
    console.log('ID à supprimer:', id); // Vérifie la valeur de l'ID
    const alert = await this.alertCtrl.create({
      header: 'Êtes-vous sûr de vouloir supprimer ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'Cancel',
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.familleService.delete(id);
            this.router.navigate(['/famille']);
          },
        },
      ],
    });
    await alert.present();
  }
  


}
