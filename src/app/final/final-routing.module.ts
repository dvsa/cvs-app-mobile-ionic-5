import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinalPage } from './final.page';

const routes: Routes = [
  {
    path: '',
    component: FinalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalPageRoutingModule {}
