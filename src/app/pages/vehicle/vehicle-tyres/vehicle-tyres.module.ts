import { NgModule } from '@angular/core';
import { VehicleTyresPage } from './vehicle-tyres';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { PipesModule } from '@pipes/pipes.module';
import { VehicleTyresPageRoutingModule } from '@app/pages/vehicle/vehicle-tyres/vehicle-tyres-routing.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    VehicleTyresPage
  ],
  imports: [
    VehicleTyresPageRoutingModule,
    PipesModule,
    IonicModule,
    CommonModule
  ],
  providers: [
    CommonFunctionsService
  ]
})
export class VehicleTyresModule {}
