import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoclientePageRoutingModule } from './pedidocliente-routing.module';

import { PedidoclientePage } from './pedidocliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoclientePageRoutingModule
  ],
  declarations: [PedidoclientePage]
})
export class PedidoclientePageModule {}
