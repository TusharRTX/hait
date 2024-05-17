import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TornillosPage } from './tornillos.page';

const routes: Routes = [
  {
    path: '',
    component: TornillosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TornillosPageRoutingModule {}
