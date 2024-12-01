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
  public membre! : Famille;

  constructor(private FamilleService : FamilleService, private toastController : ToastController, private router : Router) { }

  ngOnInit() {
  }

}
