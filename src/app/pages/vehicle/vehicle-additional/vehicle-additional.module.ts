import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { VehicleAdditionalPage } from './vehicle-additional';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { PipesModule } from '@pipes/pipes.module';
import { CommonModule } from '@angular/common';
import {
  VehicleAdditionalPageRoutingModule
} from '@app/pages/vehicle/vehicle-additional/vehicle-additional-routing.module';

@NgModule({
  declarations: [
    VehicleAdditionalPage
  ],
  imports: [
    VehicleAdditionalPageRoutingModule,
    PipesModule,
    IonicModule,
    CommonModule
  ],
  providers: [
    CommonFunctionsService
  ]
})
export class VehicleAdditionalModule {}
