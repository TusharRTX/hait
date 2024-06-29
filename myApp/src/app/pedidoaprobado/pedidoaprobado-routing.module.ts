import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoaprobadoPage } from './pedidoaprobado.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoaprobadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoaprobadoPageRoutingModule {}
