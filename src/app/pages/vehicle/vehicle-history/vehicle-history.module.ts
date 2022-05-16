import { NgModule } from '@angular/core';
import { VehicleHistoryPage } from './vehicle-history';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { PipesModule } from '@pipes/pipes.module';
import { TestTypeService } from '@providers/test-type/test-type.service';
import {VehicleHistoryPageRoutingModule} from "@app/pages/vehicle/vehicle-history/vehicle-history-routing.module";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [VehicleHistoryPage],
  imports: [
    PipesModule,
    VehicleHistoryPageRoutingModule,
    IonicModule,
    CommonModule,
  ],
  providers: [CommonFunctionsService, TestTypeService]
})
export class VehicleHistoryModule {}
