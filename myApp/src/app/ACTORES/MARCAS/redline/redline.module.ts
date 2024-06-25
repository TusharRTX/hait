import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { redlinePageRoutingModule } from './redline-routing.module';

import { redlinePage } from './redline.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    redlinePageRoutingModule
  ],
  declarations: [redlinePage]
})
export class redlinePageModule {}
