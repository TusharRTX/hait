import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { vinilitPageRoutingModule } from './vinilit-routing.module';

import { vinilitPage } from './vinilit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    vinilitPageRoutingModule
  ],
  declarations: [vinilitPage]
})
export class vinilitPageModule {}
