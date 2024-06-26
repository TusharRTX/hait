import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompradorPage } from './comprador.page';

const routes: Routes = [
  {
    path: '',
    component: CompradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompradorPageRoutingModule {}
