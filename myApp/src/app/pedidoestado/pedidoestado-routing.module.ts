import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoestadoPage } from './pedidoestado.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoestadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoestadoPageRoutingModule {}
