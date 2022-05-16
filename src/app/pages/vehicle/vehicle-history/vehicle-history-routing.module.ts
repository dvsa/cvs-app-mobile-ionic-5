import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VehicleHistoryPage} from '@app/pages/vehicle/vehicle-history/vehicle-history';

const routes: Routes = [
  {
    path: '',
    component: VehicleHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleHistoryPageRoutingModule {}
