import { NgModule } from '@angular/core';
import { TestStationHomePage } from './test-station-home';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {TestStationHomeRoutingModule} from '@app/pages/test-station/test-station-home/test.station-home-routing.module';

@NgModule({
  declarations: [TestStationHomePage],
  imports: [
    CommonModule,
    IonicModule,
    TestStationHomeRoutingModule,
  ]
})
export class TestStationHomeModule {}
