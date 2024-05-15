import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreacionPageRoutingModule } from './creacion-routing.module';

import { CreacionPage } from './creacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreacionPageRoutingModule
  ],
  declarations: [CreacionPage]
})
export class CreacionPageModule {}
