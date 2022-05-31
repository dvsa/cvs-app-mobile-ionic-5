import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  RegionReadingPageModule
} from '@app/pages/testing/test-creation/eu-vehicle-category/eu-vehicle-category.module';

const routes: Routes = [
  {
    path: '',
    component: RegionReadingPageModule,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegionReadingPageRoutingModule {}
