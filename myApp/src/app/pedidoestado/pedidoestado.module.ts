import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PedidoestadoPageRoutingModule } from './pedidoestado-routing.module';
import { PedidoestadoPage } from './pedidoestado.page';
import { EditarestadoComponent } from '../editarestado/editarestado.component';

@NgModule({
  imports: [
    CommonModule, // Asegúrate de que CommonModule está importado
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PedidoestadoPageRoutingModule
  ],
  declarations: [PedidoestadoPage, EditarestadoComponent],
  exports: [EditarestadoComponent]
})
export class PedidoestadoPageModule {}


