import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleWeightsPage } from '@app/pages/vehicle/vehicle-weights/vehicle-weights';

const routes: Routes = [
  {
    path: '',
    component: VehicleWeightsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleWeightsPageRoutingModule {}
