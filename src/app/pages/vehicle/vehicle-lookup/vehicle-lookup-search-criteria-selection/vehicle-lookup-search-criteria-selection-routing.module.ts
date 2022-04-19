import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  VehicleLookupSearchCriteriaSelectionPage
} from '@app/pages/vehicle/vehicle-lookup/vehicle-lookup-search-criteria-selection/vehicle-lookup-search-criteria-selection';

const routes: Routes = [
  {
    path: '',
    component: VehicleLookupSearchCriteriaSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleLookupSearchCriteriaSelectionRoutingModule {}
