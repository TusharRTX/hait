import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidobodegueroPage } from './pedidobodeguero.page';

const routes: Routes = [
  {
    path: '',
    component: PedidobodegueroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidobodegueroPageRoutingModule {}
