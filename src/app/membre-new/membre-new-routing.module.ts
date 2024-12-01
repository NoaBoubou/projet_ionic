import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembreNewPage } from './membre-new.page';

const routes: Routes = [
  {
    path: '',
    component: MembreNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembreNewPageRoutingModule {}
