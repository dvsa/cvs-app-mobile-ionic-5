import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleLookupPage } from '@app/pages/vehicle/vehicle-lookup/vehicle-lookup';

const routes: Routes = [
  {
    path: '',
    component: VehicleLookupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleLookupPageRoutingModule {}
