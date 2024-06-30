import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoaprobadoPageRoutingModule } from './pedidoaprobado-routing.module';

import { PedidoaprobadoPage } from './pedidoaprobado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoaprobadoPageRoutingModule
  ],
  declarations: [PedidoaprobadoPage]
})
export class PedidoaprobadoPageModule {}
