import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { vinilitPage } from './vinilit.page';

const routes: Routes = [
  {
    path: '',
    component: vinilitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class vinilitPageRoutingModule {}
