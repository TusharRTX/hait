import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { imporperPage } from './imporper.page';

const routes: Routes = [
  {
    path: '',
    component: imporperPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class imporperPageRoutingModule {}
