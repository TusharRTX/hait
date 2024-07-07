import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessvoucherPageRoutingModule } from './successvoucher-routing.module';

import { SuccessvoucherPage } from './successvoucher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessvoucherPageRoutingModule
  ],
  declarations: [SuccessvoucherPage]
})
export class SuccessvoucherPageModule {}
