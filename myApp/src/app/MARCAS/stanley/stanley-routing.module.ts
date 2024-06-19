import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { stanleyPage } from './stanley.page';

const routes: Routes = [
  {
    path: '',
    component: stanleyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class stanleyPageRoutingModule {}
