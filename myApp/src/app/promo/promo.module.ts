import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { IonicModule } from '@ionic/angular';

import { PromoPageRoutingModule } from './promo-routing.module';

import { PromoPage } from './promo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromoPageRoutingModule
  ],
  declarations: [PromoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PromoPageModule {}
