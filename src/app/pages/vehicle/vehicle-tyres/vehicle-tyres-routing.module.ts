import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleTyresPage } from '@app/pages/vehicle/vehicle-tyres/vehicle-tyres';

const routes: Routes = [
  {
    path: '',
    component: VehicleTyresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleTyresPageRoutingModule {}
