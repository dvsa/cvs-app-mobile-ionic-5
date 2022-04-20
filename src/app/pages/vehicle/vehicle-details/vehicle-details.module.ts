import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehicleDetailsPage } from './vehicle-details';
import { CommonFunctionsService } from '../../../../providers/utils/common-functions';
import { TestService } from '../../../../providers/test/test.service';
import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  declarations: [VehicleDetailsPage],
  imports: [IonicPageModule.forChild(VehicleDetailsPage), PipesModule],
  providers: [CommonFunctionsService, TestService]
})
export class VehicleDetailsModule {}
