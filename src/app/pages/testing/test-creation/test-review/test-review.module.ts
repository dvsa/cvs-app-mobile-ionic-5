import { NgModule } from '@angular/core';
import { TestReviewPage } from './test-review';
import { VehicleService } from '../../../../providers/vehicle/vehicle.service';
import { DefectsService } from '../../../../providers/defects/defects.service';
import { TestResultService } from '../../../../providers/test-result/test-result.service';
import { TestService } from '../../../../providers/test/test.service';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TestCreateRoutingModule } from '@app/pages/testing/test-creation/test-create/test-create-routing.module';

@NgModule({
  declarations: [TestReviewPage],
  imports: [
    CommonModule,
    IonicModule,
    TestCreateRoutingModule,
  ],
  providers: [
    VehicleService,
    DefectsService,
    TestResultService,
    TestService,
    TestTypeService
  ]
})
export class TestReviewModule {}
