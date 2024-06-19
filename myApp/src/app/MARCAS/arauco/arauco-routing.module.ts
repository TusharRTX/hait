import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { araucoPage } from './arauco.page';

const routes: Routes = [
  {
    path: '',
    component: araucoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class araucoPageRoutingModule {}
