import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BancochilePageRoutingModule } from './bancochile-routing.module';

import { BancochilePage } from './bancochile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BancochilePageRoutingModule
  ],
  declarations: [BancochilePage]
})
export class BancochilePageModule {}
