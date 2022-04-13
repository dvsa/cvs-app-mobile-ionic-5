import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleLookupPage } from './vehicle-lookup';
import { VehicleService } from '../../../../providers/vehicle/vehicle.service';

@NgModule({
  declarations: [VehicleLookupPage],
  imports: [IonicPageModule.forChild(VehicleLookupPage)],
  providers: [VehicleService]
})
export class VehicleLookupModule {}
