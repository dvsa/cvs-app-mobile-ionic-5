import { NgModule } from '@angular/core';
import { VehicleLookupPage } from './vehicle-lookup';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { VehicleLookupPageRoutingModule } from '@app/pages/vehicle/vehicle-lookup/vehicle-lookup-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [VehicleLookupPage],
  imports: [
    VehicleLookupPageRoutingModule,
    IonicModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    VehicleService
  ]
})
export class VehicleLookupModule {}
