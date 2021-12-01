import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnotherPage } from './another.page';

const routes: Routes = [
  {
    path: '',
    component: AnotherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnotherPageRoutingModule {}
