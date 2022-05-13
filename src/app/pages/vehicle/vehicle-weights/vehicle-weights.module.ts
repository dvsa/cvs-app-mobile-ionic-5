import { NgModule } from '@angular/core';
import { VehicleWeightsPage } from './vehicle-weights';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { PipesModule } from '@pipes/pipes.module';
import { VehicleWeightsPageRoutingModule } from '@app/pages/vehicle/vehicle-weights/vehicle-weights-routing.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    VehicleWeightsPage
  ],
  imports: [
    VehicleWeightsPageRoutingModule,
    PipesModule,
    IonicModule,
    CommonModule
  ],
  providers: [
    CommonFunctionsService
  ]
})
export class VehicleWeightsModule {}
