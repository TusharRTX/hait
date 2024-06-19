import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { imporperPageRoutingModule } from './imporper-routing.module';

import { imporperPage } from './imporper.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    imporperPageRoutingModule
  ],
  declarations: [imporperPage]
})
export class imporperPageModule {}
