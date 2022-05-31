import { NgModule } from '@angular/core';
import { TestTypesListPage } from './test-types-list';
import { PipesModule } from '@pipes/pipes.module';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {
  TestTypesListRoutingModule
} from '@app/pages/testing/test-creation/test-types-list/test-types-list-routing.module';
import { NativePageTransitions } from '@awesome-cordova-plugins/native-page-transitions/ngx';

@NgModule({
  declarations: [
    TestTypesListPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    TestTypesListRoutingModule,
    PipesModule
  ],
  providers: [
    TestTypeService,
    VehicleService,
    NativePageTransitions
  ]
})
export class TestTypesListModule {}
