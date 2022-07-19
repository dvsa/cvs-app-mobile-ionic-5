import { NgModule } from '@angular/core';
import { TestReviewPage } from './test-review';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { DefectsService } from '@providers/defects/defects.service';
import { TestResultService } from '@providers/test-result/test-result.service';
import { TestService } from '@providers/test/test.service';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TestReviewRoutingModule } from '@app/pages/testing/test-creation/test-review/test-review-routing.module';
import { NativePageTransitions } from '@awesome-cordova-plugins/native-page-transitions/ngx';

@NgModule({
  declarations: [TestReviewPage],
  imports: [
    CommonModule,
    IonicModule,
    TestReviewRoutingModule,
  ],
  providers: [
    VehicleService,
    DefectsService,
    TestResultService,
    TestService,
    TestTypeService,
    NativePageTransitions
  ]
})
export class TestReviewModule {}
