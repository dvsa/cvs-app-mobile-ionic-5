import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleHistoryDetailsPage } from './vehicle-history-details';
import { CommonFunctionsService } from '../../../../providers/utils/common-functions';
import { PipesModule } from '../../../../pipes/pipes.module';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [VehicleHistoryDetailsPage],
  imports: [IonicPageModule.forChild(VehicleHistoryDetailsPage), PipesModule, IonicModule, CommonModule],
  providers: [CommonFunctionsService, TestTypeService]
})
export class VehicleHistoryDetailsPageModule {}
