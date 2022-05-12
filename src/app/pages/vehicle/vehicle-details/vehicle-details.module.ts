import { NgModule } from '@angular/core';
import { VehicleDetailsPage } from './vehicle-details';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { TestService } from '@providers/test/test.service';
import { PipesModule } from '@pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { VehicleDetailsPageRoutingModule } from '@app/pages/vehicle/vehicle-details/vehicle-details-routing.module';
import { FormatVrmPipe } from '@pipes/format-vrm/format-vrm.pipe';
import {VehicleService} from "@providers/vehicle/vehicle.service";

@NgModule({
  declarations: [
    VehicleDetailsPage,
  ],
  imports: [
    PipesModule,
    IonicModule,
    CommonModule,
    VehicleDetailsPageRoutingModule,
  ],
  providers: [
    CommonFunctionsService,
    TestService,
    FormatVrmPipe,
    VehicleService,
  ]
})
export class VehicleDetailsModule {}
