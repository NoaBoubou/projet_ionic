import { Component, OnInit } from '@angular/core';
import { Famille } from '../models/famille.model';
import { FamilleService } from '../services/famille/famille.service';

@Component({
  selector: 'app-famille-list',
  templateUrl: './famille-list.page.html',
  styleUrls: ['./famille-list.page.scss'],
})
export class FamilleListPage implements OnInit {
  membres: Famille[] = []; // Tableau pour stocker les membres

  constructor(private familleService: FamilleService) {}

  ngOnInit(): void {
    // Récupérer les membres depuis Firestore
    this.familleService.getMembres().subscribe((data: Famille[]) => {
      this.membres = data; 
    });
  }

}
