import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessvoucherPage } from './successvoucher.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessvoucherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessvoucherPageRoutingModule {}
