import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {VehicleDetailsPage} from "@app/pages/vehicle/vehicle-details/vehicle-details";

const routes: Routes = [
  {
    path: '',
    component: VehicleDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleDetailsPageRoutingModule {}
