import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { redlinePage } from './redline.page';

const routes: Routes = [
  {
    path: '',
    component: redlinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class redlinePageRoutingModule {}
