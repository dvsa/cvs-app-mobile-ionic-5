import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MultipleTechRecordsSelectionPage } from './multiple-tech-records-selection';
import { VehicleService } from '../../../../../providers/vehicle/vehicle.service';

@NgModule({
  declarations: [MultipleTechRecordsSelectionPage],
  imports: [IonicPageModule.forChild(MultipleTechRecordsSelectionPage)],
  providers: [VehicleService]
})
export class VehicleLookupSearchCriteriaSelectionPageModule {}
