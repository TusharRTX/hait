import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoproductosPage } from './todoproductos.page';

const routes: Routes = [
  {
    path: '',
    component: TodoproductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoproductosPageRoutingModule {}
