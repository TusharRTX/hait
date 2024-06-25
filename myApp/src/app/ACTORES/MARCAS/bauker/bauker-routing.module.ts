import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { baukerPage } from './bauker.page';

const routes: Routes = [
  {
    path: '',
    component: baukerPage
  },
  {
    path: 'reload',
    component: baukerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class baukerPageRoutingModule {}
