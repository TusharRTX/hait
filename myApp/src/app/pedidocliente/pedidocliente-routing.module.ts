import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoclientePage } from './pedidocliente.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoclientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoclientePageRoutingModule {}
