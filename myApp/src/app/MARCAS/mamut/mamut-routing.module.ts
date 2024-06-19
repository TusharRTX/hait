import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MAMUTPage } from './mamut.page';

const routes: Routes = [
  {
    path: '',
    component: MAMUTPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MAMUTPageRoutingModule {}
