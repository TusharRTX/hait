import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { araucoPageRoutingModule } from './arauco-routing.module';

import { araucoPage } from './arauco.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    araucoPageRoutingModule
  ],
  declarations: [araucoPage]
})
export class araucoPageModule {}
