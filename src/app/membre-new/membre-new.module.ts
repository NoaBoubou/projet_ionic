import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembreNewPageRoutingModule } from './membre-new-routing.module';

import { MembreNewPage } from './membre-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MembreNewPageRoutingModule
  ],
  declarations: [MembreNewPage]
})
export class MembreNewPageModule {}
