import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { VehicleHistoryDetailsPage } from '@app/pages/vehicle/vehicle-history-details/vehicle-history-details';

const routes: Routes = [
  {
    path: '',
    component: VehicleHistoryDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleHistoryDetailsPageRoutingModule {}
