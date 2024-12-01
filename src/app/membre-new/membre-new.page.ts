import { Component, OnInit } from '@angular/core';
import { Famille } from '../models/famille.model';
import { FamilleService } from '../services/famille/famille.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-membre-new',
  templateUrl: './membre-new.page.html',
  styleUrls: ['./membre-new.page.scss'],
})
export class MembreNewPage implements OnInit {
  public membre!: Famille;
  public allMembres: Famille[] = [];
  public maxId: number = 0;

  constructor(
    private familleService: FamilleService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.membre = new Famille();
    this.familleService.getMembres().subscribe((data: Famille[]) => {
      this.allMembres = data;
      this.getMaxId(); 
    });
  }

  async presentToast() {
    const toast = this.toastController.create({
      message: 'Le nouveau membre a été ajouté avec succès',
      duration: 2000,
    });
    (await toast).present().then(() => {
      setTimeout(() => {
        this.router.navigate(['/famille']);
      }, 2000);
    });
  }

  add() {
    this.membre.id = (this.maxId + 1).toString(); 
    this.familleService.newMembre(this.membre).subscribe(() => {
      this.membre = new Famille();
      this.router.navigate(['/famille']);
    });
  }

  getMaxId() {
    this.maxId = 0; 
    for (const membre of this.allMembres) {
      if (membre.id != null) {
        const memberId = Number(membre.id); 
        if (memberId > this.maxId) {
          this.maxId = memberId; 
        }
      }
    }
    console.log('Max ID:', this.maxId); 
  }
}
