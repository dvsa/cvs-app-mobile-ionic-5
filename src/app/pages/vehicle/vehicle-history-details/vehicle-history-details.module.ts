import { NgModule } from '@angular/core';
import { VehicleHistoryDetailsPage } from './vehicle-history-details';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { PipesModule } from '@pipes/pipes.module';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {
  VehicleHistoryDetailsPageRoutingModule
} from '@app/pages/vehicle/vehicle-history-details/vehicle-history-details-routing.module';

@NgModule({
  declarations: [VehicleHistoryDetailsPage],
  imports: [
    PipesModule,
    IonicModule,
    CommonModule,
    VehicleHistoryDetailsPageRoutingModule,
  ],
  providers: [CommonFunctionsService, TestTypeService]
})
export class VehicleHistoryDetailsModule {}
