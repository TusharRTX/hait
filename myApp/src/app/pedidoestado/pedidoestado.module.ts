import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoestadoPageRoutingModule } from './pedidoestado-routing.module';

import { PedidoestadoPage } from './pedidoestado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoestadoPageRoutingModule
  ],
  declarations: [PedidoestadoPage]
})
export class PedidoestadoPageModule {}
