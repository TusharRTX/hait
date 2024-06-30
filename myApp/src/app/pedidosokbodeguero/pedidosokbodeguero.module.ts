import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosokbodegueroPageRoutingModule } from './pedidosokbodeguero-routing.module';

import { PedidosokbodegueroPage } from './pedidosokbodeguero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosokbodegueroPageRoutingModule
  ],
  declarations: [PedidosokbodegueroPage]
})
export class PedidosokbodegueroPageModule {}
