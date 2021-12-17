import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import { NativePluginsTestPage } from './native-plugins-test';
import { NativePluginsTestRoutingModule } from './native-plugins-test-routing.module';

@NgModule({
  declarations: [NativePluginsTestPage],
  imports: [
    CommonModule,
    IonicModule,
    NativePluginsTestRoutingModule,
  ]
})
export class TestStationHomeModule {}
