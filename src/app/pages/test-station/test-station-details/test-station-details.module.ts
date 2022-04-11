import { NgModule } from '@angular/core';
import { TestStationDetailsPage } from './test-station-details';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {
  TestStationDetailsRoutingModule
} from '@app/pages/test-station/test-station-details/test-station-details-routing.module';

@NgModule({
  declarations: [TestStationDetailsPage],
  imports: [
    CommonModule,
    IonicModule,
    TestStationDetailsRoutingModule,
  ]
})
export class TestStationDetailsModule {}
