import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PedidobodegueroPageRoutingModule } from './pedidobodeguero-routing.module';
import { PedidobodegueroPage } from './pedidobodeguero.page';
import { AprobarPedidoModalComponent } from '../aprobar-pedido-modal/aprobar-pedido-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidobodegueroPageRoutingModule
  ],
  declarations: [
    PedidobodegueroPage,
    AprobarPedidoModalComponent
  ]
})
export class PedidobodegueroPageModule {}

