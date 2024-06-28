import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoproductosPageRoutingModule } from './todoproductos-routing.module';

import { TodoproductosPage } from './todoproductos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoproductosPageRoutingModule
  ],
  declarations: [TodoproductosPage]
})
export class TodoproductosPageModule {}
