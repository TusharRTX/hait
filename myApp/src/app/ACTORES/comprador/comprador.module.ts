import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompradorPageRoutingModule } from './comprador-routing.module';

import { CompradorPage } from './comprador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompradorPageRoutingModule
  ],
  declarations: [CompradorPage]
})
export class CompradorPageModule {}
