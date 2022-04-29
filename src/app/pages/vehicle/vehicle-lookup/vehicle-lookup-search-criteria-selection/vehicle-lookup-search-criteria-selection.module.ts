import { NgModule } from '@angular/core';
import { VehicleLookupSearchCriteriaSelectionPage } from './vehicle-lookup-search-criteria-selection';
import {
  VehicleLookupSearchCriteriaSelectionRoutingModule
} from '@app/pages/vehicle/vehicle-lookup/vehicle-lookup-search-criteria-selection/vehicle-lookup-search-criteria-selection-routing.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    VehicleLookupSearchCriteriaSelectionPage
  ],
  imports: [
    VehicleLookupSearchCriteriaSelectionRoutingModule,
    CommonModule,
    IonicModule,
  ]
})
export class VehicleLookupSearchCriteriaSelectionPageModule {}
