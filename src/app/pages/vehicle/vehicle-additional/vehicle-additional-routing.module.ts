import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleAdditionalPage } from '@app/pages/vehicle/vehicle-additional/vehicle-additional';

const routes: Routes = [
  {
    path: '',
    component: VehicleAdditionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleAdditionalPageRoutingModule {}
