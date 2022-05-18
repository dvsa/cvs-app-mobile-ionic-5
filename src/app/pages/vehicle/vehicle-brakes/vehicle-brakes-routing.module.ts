import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleBrakesPage } from '@app/pages/vehicle/vehicle-brakes/vehicle-brakes';

const routes: Routes = [
  {
    path: '',
    component: VehicleBrakesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleBrakesPageRoutingModule {}
