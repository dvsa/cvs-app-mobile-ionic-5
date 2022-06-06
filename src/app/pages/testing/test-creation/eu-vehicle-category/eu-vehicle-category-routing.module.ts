import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EuVehicleCategoryPage } from '@app/pages/testing/test-creation/eu-vehicle-category/eu-vehicle-category';

const routes: Routes = [
  {
    path: '',
    component: EuVehicleCategoryPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EuVehicleCategoryRoutingModule {}
