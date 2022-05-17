import { NgModule } from '@angular/core';
import { VehicleBrakesPage } from './vehicle-brakes';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { PipesModule } from '@pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { VehicleBrakesPageRoutingModule } from '@app/pages/vehicle/vehicle-brakes/vehicle-brakes-routing.module';

@NgModule({
  declarations: [
    VehicleBrakesPage
  ],
  imports: [
    VehicleBrakesPageRoutingModule,
    PipesModule,
    IonicModule,
    CommonModule
  ],
  providers: [
    CommonFunctionsService
  ]
})
export class VehicleBrakesModule {}
