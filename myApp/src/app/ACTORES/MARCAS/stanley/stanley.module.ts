import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { stanleyPageRoutingModule } from './stanley-routing.module';

import { stanleyPage } from './stanley.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    stanleyPageRoutingModule
  ],
  declarations: [stanleyPage]
})
export class stanleyPageModule {}
