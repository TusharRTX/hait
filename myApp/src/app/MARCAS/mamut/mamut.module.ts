import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MAMUTPageRoutingModule } from './mamut-routing.module';

import { MAMUTPage } from './mamut.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MAMUTPageRoutingModule
  ],
  declarations: [MAMUTPage]
})
export class MAMUTPageModule {}
