import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { baukerPageRoutingModule } from './bauker-routing.module';

import { baukerPage } from './bauker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    baukerPageRoutingModule
  ],
  declarations: [baukerPage]
})
export class baukerPageModule {}
